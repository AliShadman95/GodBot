import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
/* import {
  getSettingsAction,
  getSettingsError,
  getSettingsLoading,
  getSettingsSuccess,
} from './actions'; */
import { dashboardActions } from '../slice/index';

import { GET_SETTINGS } from './constants';

function* fetchSettings(dispatch) {
  yield put(dashboardActions.getSettingsLoading());
  const response = yield call(fetch, 'http://localhost:8080/settings', {
    method: 'GET',
  });
  if (response.ok) {
    const data = yield response.json();
    console.log(data);
    yield put(dashboardActions.getSettingsSuccess(data));
  } else {
    yield put(
      dashboardActions.getSettingsError({ status: response.status, response }),
    );
  }
}

export function* dashboardSaga() {
  try {
    yield takeLatest(dashboardActions.getSettingsAction, fetchSettings);
  } catch (error) {
    console.log(error);
  }
}
