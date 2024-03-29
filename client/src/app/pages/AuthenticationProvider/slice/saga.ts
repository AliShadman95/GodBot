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
  getUserRole,
  setIdDiscord,
  deleteIdDiscord,
  getIdDiscord,
} from 'utils/api';

async function login(payload) {
  try {
    return await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/login`,
      payload,
    );
  } catch (response) {
    return response;
  }
}

export function* authentication({ payload }) {
  yield put(authenticationProviderActions.retrieveTokenLoading());
  const { username, password } = payload;
  const response = yield call(login, { username, password });
  if (response.status === 200) {
    const { accessToken, role, idDiscord } = response.data;
    setUsername(username);
    setUserRole(role);
    setToken(accessToken);
    setIdDiscord(idDiscord);
    yield put(
      authenticationProviderActions.retrieveTokenSuccess({
        token: accessToken,
        username,
        role,
        idDiscord,
      }),
    );
  } else {
    deleteUsername();
    deleteUserRole();
    deleteToken();
    deleteIdDiscord();
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
    const userRole = getUserRole();
    const idDiscord = getIdDiscord();

    const response = yield call(poweredFetch, {
      method: 'GET',
      url: `${process.env.REACT_APP_SERVER_URL}/settings`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      yield put(
        authenticationProviderActions.verifyTokenSuccess({
          username,
          token,
          role: userRole,
          idDiscord,
        }),
      );
    } else {
      yield put(authenticationProviderActions.verifyTokenError(response.data));
      yield put(authenticationProviderActions.logoutAction());
    }
  } else {
    yield put(
      authenticationProviderActions.verifyTokenError('Errore generico'),
    );
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
