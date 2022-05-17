import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.dashboard || initialState;

export const selectDashboard = createSelector([selectSlice], state => state);
