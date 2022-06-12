import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { leaderboardSaga } from './saga';
import { LeaderboardState } from './types';

export const initialState: LeaderboardState = {
  users: [],
  settings: {},
  rankInfo: {},
  loading: false,
  error: undefined,
};

const slice = createSlice({
  name: 'leaderboard',
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
    getUsersAction: state => {},
    getUsersLoading: state => {
      state.loading = true;
    },
    getUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload.sort(
        (a, b) => parseInt(b.points) - parseInt(a.points),
      );
    },
    getUsersError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetRanksAction: (state, action) => {},
    resetRanksLoading: state => {
      state.loading = true;
    },
    resetRanksSuccess: (state, action) => {
      state.loading = false;
    },
    resetRanksError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetAllRanksAction: state => {},
    resetAllRanksLoading: state => {
      state.loading = true;
    },
    resetAllRanksSuccess: (state, action) => {
      state.loading = false;
    },
    resetAllRanksError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getRankUserAction: (state, action) => {},
    getRankUserLoading: state => {
      state.loading = true;
    },
    getRankUserSuccess: (state, action) => {
      state.loading = false;
      state.rankInfo = action.payload;
    },
    getRankUserError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions: leaderboardActions } = slice;

export const useLeaderboardSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: leaderboardSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useLeaderboardSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
