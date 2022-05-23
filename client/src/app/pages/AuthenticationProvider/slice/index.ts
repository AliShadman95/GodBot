import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { authenticationProviderSaga } from './saga';
import { AuthenticationProviderState } from './types';

export const initialState: AuthenticationProviderState = {
  token: undefined,
  error: undefined,
  loading: false,
  userRole: '',
  username: '',
};

const slice = createSlice({
  name: 'authenticationProvider',
  initialState,
  reducers: {
    retrieveTokenAction(state, action: PayloadAction<any>) {},
    retrieveTokenLoading(state) {
      state.loading = true;
    },
    retrieveTokenSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.token = action.payload.token;
      state.userRole = action.payload.role;
      state.username = action.payload.username;
    },
    retrieveTokenError(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload;
    },
    logoutAction(state) {
      state.token = undefined;
      state.userRole = '';
      state.username = '';
    },
  },
});

export const { actions: authenticationProviderActions } = slice;

export const useAuthenticationProviderSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: authenticationProviderSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useAuthenticationProviderSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
