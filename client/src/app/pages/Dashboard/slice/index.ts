import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { dashboardSaga } from './saga';
import { DashboardState } from './types';
import { GET_SETTINGS } from './constants';

export const initialState: DashboardState = {
  settings: {},
  loading: false,
  error: undefined,
};

const slice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    getSettingsAction: (state, action: PayloadAction<any>) => {},
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
