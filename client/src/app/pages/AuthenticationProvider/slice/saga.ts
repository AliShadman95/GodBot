import axios from 'axios';
import { takeLatest, all, call, put } from 'redux-saga/effects';
import { authenticationProviderActions } from '../slice/index';
import { alertActions } from '../../Alert/slice/index';
import {
  setUsername,
  setToken,
  setUserRole,
  deleteUsername,
  deleteUserRole,
  deleteToken,
  getUsername,
  getToken,
  poweredFetch,
} from 'utils/api';

function login(payload) {
  try {
    return poweredFetch({
      method: 'POST',
      url: `http://${process.env.REACT_APP_SERVER_URL}/auth/login`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: JSON.stringify(payload),
    });
  } catch ({ response }) {
    return response;
  }
}

export function* authentication({ payload }) {
  yield put(authenticationProviderActions.retrieveTokenLoading());
  const { username, password } = payload;
  const response = yield call(login, { username, password });
  console.log({ response });
  if (response.status === 200) {
    const { accessToken, role } = response.data;
    setUsername(username);
    setUserRole(role);
    setToken(accessToken);
    yield put(
      authenticationProviderActions.retrieveTokenSuccess({
        token: accessToken,
        username,
        role,
      }),
    );
  } else {
    deleteUsername();
    deleteUserRole();
    deleteToken();

    yield put(alertActions.showAlert(response.response.data));
    yield put(
      authenticationProviderActions.retrieveTokenError(response.response.data),
    );
  }
}

export function* logoutSaga() {
  yield Object.keys(localStorage).forEach(k => {
    if (k !== 'columnsSizes') {
      window.localStorage.removeItem(k);
    }
  });
}

export function* verifiyLoginSaga() {
  yield put(authenticationProviderActions.verifyTokenLoading());
  const username = getUsername();
  if (username) {
    const token = getToken();
    const response = yield call(poweredFetch, {
      method: 'GET',
      url: `http://${process.env.REACT_APP_SERVER_URL}/settings`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      yield put(authenticationProviderActions.verifyTokenSuccess());
    } else {
      yield put(authenticationProviderActions.verifyTokenError());
      yield put(authenticationProviderActions.logoutAction());
    }
  }
}

export function* authenticationProviderSaga() {
  try {
    yield all([
      takeLatest(
        authenticationProviderActions.retrieveTokenAction,
        authentication,
      ),
      takeLatest(authenticationProviderActions.logoutAction, logoutSaga),
      takeLatest(
        authenticationProviderActions.verifyTokenAction,
        verifiyLoginSaga,
      ),
    ]);
  } catch (error) {
    console.log(error);
  }
}
