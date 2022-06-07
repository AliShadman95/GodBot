import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.dashboard || initialState;

export const selectDashboard = createSelector([selectSlice], state => state);

export const selectSettings = createSelector(
  [selectSlice],
  state => state.settings,
);

export const selectVoiceChannels = createSelector(
  [selectSlice],
  state => state.voiceChannels,
);

export const selectTextChannels = createSelector(
  [selectSlice],
  state => state.textChannels,
);
export const selectRoles = createSelector([selectSlice], state => state.roles);

export const selectLoading = createSelector(
  [selectSlice],
  state => state.loading,
);
export const selectLoadingUpdate = createSelector(
  [selectSlice],
  state => state.loadingUpdate,
);
export const selectCardInfo = createSelector(
  [selectSlice],
  state => state.cardInfo,
);
