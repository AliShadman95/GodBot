import { call, put, all, takeLatest } from 'redux-saga/effects';
import { dashboardActions } from '../slice/index';
import { poweredFetch } from 'utils/api';

function* getSettings(dispatch) {
  yield put(dashboardActions.getSettingsLoading());
  const response = yield call(poweredFetch, {
    url: `${process.env.REACT_APP_SERVER_URL}/settings`,
    method: 'GET',
  });
  if (response.status === 200) {
    yield put(dashboardActions.getSettingsSuccess(response.data));
  } else {
    yield put(dashboardActions.getSettingsError(response.data));
  }
}

function* updateSettings({ payload }) {
  yield put(dashboardActions.updateSettingsLoading());

  const response = yield call(poweredFetch, {
    method: 'PUT',
    url: `${process.env.REACT_APP_SERVER_URL}/settings`,
    data: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.status === 200) {
    yield put(dashboardActions.updateSettingsSuccess(response.data));
  } else {
    yield put(dashboardActions.updateSettingsError(response.data));
  }
}

function* getVoiceChannels(dispatch) {
  yield put(dashboardActions.getVoiceChannelsLoading());
  const response = yield call(
    poweredFetch,

    {
      url: `${process.env.REACT_APP_SERVER_URL}/settings/voiceChannels`,
      method: 'GET',
    },
  );
  if (response.status === 200) {
    yield put(dashboardActions.getVoiceChannelsSuccess(response.data));
  } else {
    yield put(dashboardActions.getVoiceChannelsError(response.data));
  }
}

function* getTextChannels(dispatch) {
  yield put(dashboardActions.getTextChannelsLoading());
  const response = yield call(poweredFetch, {
    url: `${process.env.REACT_APP_SERVER_URL}/settings/textChannels`,
    method: 'GET',
  });
  if (response.status === 200) {
    yield put(dashboardActions.getTextChannelsSuccess(response.data));
  } else {
    yield put(dashboardActions.getTextChannelsError(response.data));
  }
}

function* getRoles(dispatch) {
  yield put(dashboardActions.getRolesLoading());
  const response = yield call(poweredFetch, {
    url: `${process.env.REACT_APP_SERVER_URL}/settings/roles`,
    method: 'GET',
  });
  if (response.status === 200) {
    yield put(dashboardActions.getRolesSuccess(response.data));
  } else {
    yield put(dashboardActions.getRolesError(response.data));
  }
}

function* getRankUser({ payload }) {
  yield put(dashboardActions.getRankUserLoading());
  const response = yield call(poweredFetch, {
    url: `${process.env.REACT_APP_SERVER_URL}/ranks/rank?id=${payload.id}&username=${payload.username}`,
    method: 'GET',
  });
  if (response.status === 200) {
    yield put(dashboardActions.getRankUserSuccess(response.data));
  } else {
    yield put(dashboardActions.getRankUserError(response.data));
  }
}

function* getAllRanks(dispatch) {
  yield put(dashboardActions.getAllRanksLoading());
  const response = yield call(poweredFetch, {
    url: `${process.env.REACT_APP_SERVER_URL}/ranks`,
    method: 'GET',
  });
  if (response.status === 200) {
    yield put(dashboardActions.getAllRanksSuccess(response.data));
  } else {
    yield put(dashboardActions.getAllRanksError(response.data));
  }
}

function* uploadImage({ payload }) {
  console.log(payload);
  yield put(dashboardActions.uploadImageLoading());

  const formData = new FormData();

  formData.append('file', payload.file);
  formData.append('username', payload.username);
  formData.append('id', payload.id);

  const response = yield call(poweredFetch, {
    method: 'POST',
    url: `${process.env.REACT_APP_SERVER_URL}/settings/backgroundImage`,
    data: formData,
    headers: { 'Content-Type': 'multipart/formdata' },
  });
  if (response.status === 200) {
    yield put(dashboardActions.uploadImageSuccess(response.data));
  } else {
    yield put(dashboardActions.uploadImageError(response.data));
  }
}

export function* dashboardSaga() {
  try {
    yield all([
      takeLatest(dashboardActions.getSettingsAction, getSettings),
      takeLatest(dashboardActions.uploadImageAction, uploadImage),
      takeLatest(dashboardActions.getAllRanksAction, getAllRanks),
      takeLatest(dashboardActions.getRankUserAction, getRankUser),
      takeLatest(dashboardActions.getVoiceChannelsAction, getVoiceChannels),
      takeLatest(dashboardActions.getTextChannelsAction, getTextChannels),
      takeLatest(dashboardActions.getRolesAction, getRoles),
      takeLatest(dashboardActions.updateSettingsAction, updateSettings),
    ]);
  } catch (error) {
    console.log(error);
  }
}
