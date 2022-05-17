import { GET_SETTINGS } from './constants';

export function getSettingsAction(payload) {
  return {
    type: GET_SETTINGS.ACTION,
    payload,
  };
}

export function getSettingsLoading() {
  return {
    type: GET_SETTINGS.LOADING,
  };
}

export function getSettingsSuccess(payload) {
  return {
    type: GET_SETTINGS.SUCCESS,
    payload,
  };
}

export function getSettingsError(payload) {
  return {
    type: GET_SETTINGS.ERROR,
    payload,
  };
}
