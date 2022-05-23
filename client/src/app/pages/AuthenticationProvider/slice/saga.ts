import axios from 'axios';
import { takeLatest, all, call, put } from 'redux-saga/effects';
import { authenticationProviderActions } from '../slice/index';
import {
  setUsername,
  setToken,
  setUserRole,
  deleteUsername,
  deleteUserRole,
  deleteToken,
} from 'utils/api';
function login(payload) {
  return axios.post(`/auth/login`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${payload.token}`,
    },
  });
}

export function* authentication({ payload }) {
  yield put(authenticationProviderActions.retrieveTokenLoading());
  const { username, password } = payload;
  const response = yield call(login, { username, password });
  if (response.ok) {
    const { token, role } = yield response.json();
    setUsername(username);
    setUserRole(role);
    setToken(token);
    yield put(
      authenticationProviderActions.retrieveTokenSuccess({
        token,
        username,
        role,
      }),
    );
  } else {
    deleteUsername();
    deleteUserRole();
    deleteToken();
    yield put(
      authenticationProviderActions.retrieveTokenError({ error: response }),
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

export function* authenticationProviderSaga() {
  try {
    yield all([
      takeLatest(
        authenticationProviderActions.retrieveTokenAction,
        authentication,
      ),
      takeLatest(authenticationProviderActions.logoutAction, logoutSaga),
    ]);
  } catch (error) {
    console.log(error);
  }
}
