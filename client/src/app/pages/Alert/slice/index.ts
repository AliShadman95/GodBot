import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { AlertState } from './types';

export const initialState: AlertState = {
  showAlert: false,
  message: '',
};

const slice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert(state, action: PayloadAction<any>) {
      state.showAlert = true;
      state.message = action.payload;
    },
    hideAlert(state) {
      state.showAlert = false;
    },
  },
});

export const { actions: alertActions } = slice;

export const useAlertSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useAlertSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
