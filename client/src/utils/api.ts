import axios from 'axios';
const TOKEN_LABEL = 'token';
const USER_ROLE_LABEL = 'userRole';
const USERNAME_LABEL = 'username';
const USER_INFO = 'userinfo';

export const getUserinfo = () => {
  const stringUserRole = window.localStorage.getItem(USER_INFO);
  return !stringUserRole ? null : JSON.parse(stringUserRole);
};

export const setUserinfo = param =>
  !param ? null : window.localStorage.setItem(USER_INFO, param);
export const deleteUserinfo = () => window.localStorage.removeItem(USER_INFO);
export const getToken = () => window.localStorage.getItem(TOKEN_LABEL);
export const setToken = token =>
  window.localStorage.setItem(TOKEN_LABEL, token);
export const deleteToken = () => window.localStorage.removeItem(TOKEN_LABEL);

export const getUserRole = () => {
  const stringUserRole = window.localStorage.getItem(USER_ROLE_LABEL);
  return !stringUserRole ? null : JSON.parse(stringUserRole);
};
export const setUserRole = param =>
  !param
    ? null
    : window.localStorage.setItem(USER_ROLE_LABEL, JSON.stringify(param));

export const deleteUserRole = () =>
  window.localStorage.removeItem(USER_ROLE_LABEL);

export const setUsername = mail =>
  window.localStorage.setItem(USERNAME_LABEL, mail);
export const getUsername = () => window.localStorage.getItem(USERNAME_LABEL);
export const deleteUsername = () =>
  window.localStorage.removeItem(USERNAME_LABEL);

export function getBaseHeaders(headers = {}, isBodyFormData) {
  const token = getToken();
  const completeHeaders = {
    Accept: 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...headers,
  };

  if (!isBodyFormData) {
    completeHeaders['Content-Type'] = 'application/json; charset=UTF-8';
  }
  return completeHeaders;
}

export function poweredFetch({ headers = {}, ...options }) {
  const isBodyFormData = options.data instanceof FormData;
  const finalOptions = {
    headers: {
      ...getBaseHeaders(headers, isBodyFormData),
    },
    ...options,
  };

  return axios(finalOptions).then(checkAuthorized).catch(checkAuthorized);
}

export function checkAuthorized(response) {
  if (
    response.status === 401 ||
    response.status === 403 ||
    response.status === 404
  ) {
    Object.keys(localStorage).forEach(k => {
      if (k !== 'columnsSizes') {
        window.localStorage.removeItem(k);
      }
    });
    window.location.href = '/';
  }
  return response;
}

export function isAdmin() {
  return getUserRole() === 'admin';
}
