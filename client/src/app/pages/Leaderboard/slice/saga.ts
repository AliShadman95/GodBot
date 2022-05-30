import { call, put, takeLatest, all } from 'redux-saga/effects';
import { leaderboardActions as actions } from '.';
import { poweredFetch } from 'utils/api';

function* getSettings(dispatch) {
  yield put(actions.getSettingsLoading());
  const response = yield call(poweredFetch, {
    url: `http://${process.env.REACT_APP_SERVER_URL}/settings`,
    method: 'GET',
  });
  if (response.status === 200) {
    yield put(actions.getSettingsSuccess(response.data));
  } else {
    yield put(actions.getSettingsError(response.data));
  }
}

function* getUsers(dispatch) {
  yield put(actions.getUsersLoading());
  const response = yield call(poweredFetch, {
    url: `http://${process.env.REACT_APP_SERVER_URL}/ranks`,
    method: 'GET',
  });
  if (response.status === 200) {
    yield put(actions.getUsersSuccess(response.data));
  } else {
    yield put(actions.getUsersError(response.data));
  }
}

function* resetRanks({ payload }) {
  yield put(actions.resetRanksLoading());
  const response = yield call(poweredFetch, {
    url: `http://${process.env.REACT_APP_SERVER_URL}/ranks/resetRanks`,
    method: 'PUT',
    data: payload,
  });
  if (response.status === 200) {
    yield put(actions.resetRanksSuccess(response.data));
    yield put(actions.getUsersAction());
  } else {
    yield put(actions.resetRanksError(response.data));
  }
}

function* resetAllRanks({ payload }) {
  yield put(actions.resetAllRanksLoading());
  const response = yield call(poweredFetch, {
    url: `http://${process.env.REACT_APP_SERVER_URL}/ranks/resetAllRanks`,
    method: 'PUT',
  });
  if (response.status === 200) {
    yield put(actions.resetAllRanksSuccess(response.data));
    yield put(actions.getUsersAction());
  } else {
    yield put(actions.resetAllRanksError(response.data));
  }
}

export function* leaderboardSaga() {
  try {
    yield all([
      takeLatest(actions.getSettingsAction, getSettings),
      takeLatest(actions.getUsersAction, getUsers),
      takeLatest(actions.resetAllRanksAction, resetAllRanks),
      takeLatest(actions.resetRanksAction, resetRanks),
    ]);
  } catch (error) {
    console.log(error);
  }
}
