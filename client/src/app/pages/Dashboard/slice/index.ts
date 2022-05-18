import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { dashboardSaga } from './saga';
import { DashboardState } from './types';

export const initialState: DashboardState = {
  settings: {},
  voiceChannels: [],
  textChannels: [],
  loading: false,
  error: undefined,
  loadingUpdate: false,
};

const slice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    getSettingsAction: state => {},
    getSettingsLoading: state => {
      state.loading = true;
    },
    getSettingsSuccess: (state, action) => {
      state.loading = false;
      state.settings = action.payload;
    },
    getSettingsError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getVoiceChannelsAction: state => {},
    getVoiceChannelsLoading: state => {
      state.loading = true;
    },
    getVoiceChannelsSuccess: (state, action) => {
      state.loading = false;
      state.voiceChannels = action.payload;
    },
    getVoiceChannelsError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getTextChannelsAction: state => {},
    getTextChannelsLoading: state => {
      state.loading = true;
    },
    getTextChannelsSuccess: (state, action) => {
      state.loading = false;
      state.textChannels = action.payload;
    },
    getTextChannelsError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateSettingsAction: (state, action) => {},
    updateSettingsLoading: state => {
      state.loadingUpdate = true;
    },
    updateSettingsSuccess: (state, action) => {
      state.loadingUpdate = false;
      state.settings = action.payload;
    },
    updateSettingsError: (state, action) => {
      state.error = action.payload;
      state.loadingUpdate = false;
    },
  },
});

export const { actions: dashboardActions } = slice;

export const useDashboardSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: dashboardSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useDashboardSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
