import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { dashboardSaga } from './saga';
import { DashboardState } from './types';
import { getIdDiscord } from 'utils/api';

export const initialState: DashboardState = {
  settings: {},
  cardInfo: {},
  rankInfo: {},
  voiceChannels: [],
  textChannels: [],
  roles: [],
  loading: false,
  error: undefined,
  loadingUpdate: false,
  allRanks: [],
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
      state.cardInfo =
        action.payload.rank.cards.find(
          card => card.idDiscord === getIdDiscord(),
        ) || action.payload.rank.cards.find(card => card.idDiscord === '0');
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
    getRolesAction: state => {},
    getRolesLoading: state => {
      state.loading = true;
    },
    getRolesSuccess: (state, action) => {
      state.loading = false;
      state.roles = action.payload;
    },
    getRolesError: (state, action) => {
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
      state.cardInfo =
        action.payload.rank.cards.find(
          card => card.idDiscord === getIdDiscord(),
        ) || action.payload.rank.cards.find(card => card.idDiscord === '0');
    },
    updateSettingsError: (state, action) => {
      state.error = action.payload;
      state.loadingUpdate = false;
    },
    clearDashboardState: state => {
      state.settings = {};
      state.cardInfo = {};
      state.voiceChannels = [];
      state.textChannels = [];
      state.roles = [];
      state.loading = false;
      state.error = undefined;
      state.loadingUpdate = false;
      state.allRanks = [];
      state.rankInfo = {};
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
    getAllRanksAction: state => {},
    getAllRanksLoading: state => {
      state.loading = true;
    },
    getAllRanksSuccess: (state, action) => {
      state.loading = false;
      state.allRanks = action.payload;
    },
    getAllRanksError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    uploadImageAction: (state, action) => {},
    uploadImageLoading: state => {
      state.loadingUpdate = true;
    },
    uploadImageSuccess: (state, action) => {
      state.loadingUpdate = false;
      state.settings = action.payload;
      state.cardInfo =
        action.payload.rank.cards.find(
          card => card.idDiscord === getIdDiscord(),
        ) || action.payload.rank.cards.find(card => card.idDiscord === '0');
    },
    uploadImageError: (state, action) => {
      state.error = action.payload;
      state.loadingUpdate = false;
    },
    uploadCoinIconAction: (state, action) => {},
    uploadCoinIconLoading: state => {
      state.loadingUpdate = true;
    },
    uploadCoinIconSuccess: (state, action) => {
      state.loadingUpdate = false;
      state.settings = action.payload;
      state.cardInfo =
        action.payload.rank.cards.find(
          card => card.idDiscord === getIdDiscord(),
        ) || action.payload.rank.cards.find(card => card.idDiscord === '0');
    },
    uploadCoinIconError: (state, action) => {
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
