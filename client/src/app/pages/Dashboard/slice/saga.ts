import { call, put, all, takeLatest } from 'redux-saga/effects';
import { dashboardActions } from '../slice/index';

function* getSettings(dispatch) {
  console.log(process.env.REACT_APP_SERVER_URL);
  yield put(dashboardActions.getSettingsLoading());
  const response = yield call(
    fetch,
    `http://${process.env.REACT_APP_SERVER_URL}/settings`,
    {
      method: 'GET',
    },
  );
  if (response.status === 200) {
    const data = yield response.json();
    yield put(dashboardActions.getSettingsSuccess(data));
  } else {
    yield put(
      dashboardActions.getSettingsError({ status: response.status, response }),
    );
  }
}

function* updateSettings({ payload }) {
  yield put(dashboardActions.updateSettingsLoading());
  const response = yield call(
    fetch,
    `http://${process.env.REACT_APP_SERVER_URL}/settings`,
    {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    },
  );
  if (response.status === 200) {
    const data = yield response.json();
    yield put(dashboardActions.updateSettingsSuccess(data));
  } else {
    yield put(
      dashboardActions.updateSettingsError({
        status: response.status,
        response,
      }),
    );
  }
}

function* getVoiceChannels(dispatch) {
  yield put(dashboardActions.getVoiceChannelsLoading());
  const response = yield call(
    fetch,
    `http://${process.env.REACT_APP_SERVER_URL}/settings/voiceChannels`,
    {
      method: 'GET',
    },
  );
  if (response.status === 200) {
    const data = yield response.json();
    yield put(dashboardActions.getVoiceChannelsSuccess(data));
  } else {
    yield put(
      dashboardActions.getVoiceChannelsError({
        status: response.status,
        response,
      }),
    );
  }
}

function* getTextChannels(dispatch) {
  yield put(dashboardActions.getTextChannelsLoading());
  const response = yield call(
    fetch,
    `http://${process.env.REACT_APP_SERVER_URL}/settings/textChannels`,
    {
      method: 'GET',
    },
  );
  if (response.status === 200) {
    const data = yield response.json();
    yield put(dashboardActions.getTextChannelsSuccess(data));
  } else {
    yield put(
      dashboardActions.getTextChannelsError({
        status: response.status,
        response,
      }),
    );
  }
}

export function* dashboardSaga() {
  try {
    yield all([
      takeLatest(dashboardActions.getSettingsAction, getSettings),
      takeLatest(dashboardActions.getVoiceChannelsAction, getVoiceChannels),
      takeLatest(dashboardActions.getTextChannelsAction, getTextChannels),
      takeLatest(dashboardActions.updateSettingsAction, updateSettings),
    ]);
  } catch (error) {
    console.log(error);
  }
}
