import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.leaderboard || initialState;

export const selectLeaderboard = createSelector([selectSlice], state => state);

export const selectLeaderboardUsers = createSelector(
  [selectSlice],
  state => state.users,
);
export const selectLeaderboardSettings = createSelector(
  [selectSlice],
  state => state.settings,
);
export const selectLeaderboardLoading = createSelector(
  [selectSlice],
  state => state.loading,
);
