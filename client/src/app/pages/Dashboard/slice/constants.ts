import { defineAction } from 'redux-define';

export const ASYNC_ACTIONS = ['LOADING', 'SUCCESS', 'ERROR'];

export const APP = defineAction('GodBot');

export const GET_SETTINGS = APP.defineAction('GET_SETTINGS', ASYNC_ACTIONS);
