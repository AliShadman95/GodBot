import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.alert || initialState;

export const selectAlert = createSelector([selectSlice], state => state);
