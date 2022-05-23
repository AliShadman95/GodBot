import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.authenticationProvider || initialState;

export const selectAuthenticationProvider = createSelector(
  [selectSlice],
  state => state,
);
