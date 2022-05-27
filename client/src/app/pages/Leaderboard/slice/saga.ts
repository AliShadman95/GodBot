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

export function* leaderboardSaga() {
  try {
    yield all([
      takeLatest(actions.getSettingsAction, getSettings),
      takeLatest(actions.getUsersAction, getUsers),
    ]);
  } catch (error) {
    console.log(error);
  }
}
