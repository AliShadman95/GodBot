import axios, { AxiosPromise } from 'axios';

const TOKEN_LABEL = 'token';
const USER_ROLE_LABEL = 'userRole';
const USERNAME_LABEL = 'username';
const USER_INFO = 'userinfo';
const ID_DISCORD_LABEL = 'idDiscord';

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

export const setIdDiscord = mail =>
  window.localStorage.setItem(ID_DISCORD_LABEL, mail);
export const getIdDiscord = () => window.localStorage.getItem(ID_DISCORD_LABEL);
export const deleteIdDiscord = () =>
  window.localStorage.removeItem(ID_DISCORD_LABEL);

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

export const poweredFetch = ({
  headers = {},
  ...options
}): AxiosPromise<any> => {
  const isBodyFormData: boolean = options.data instanceof FormData;
  const finalOptions = {
    headers: {
      ...getBaseHeaders(headers, isBodyFormData),
    },
    ...options,
  };

  return axios(finalOptions).then(checkAuthorized).catch(checkAuthorized);
};

export const checkAuthorized = response => {
  if (
    response.status === 401 ||
    response.status === 403 ||
    response.status === 404 ||
    response?.response?.status === 401 ||
    response?.response?.status === 403 ||
    response?.response?.status === 404
  ) {
    Object.keys(localStorage).forEach(k => {
      if (k !== 'columnsSizes') {
        window.localStorage.removeItem(k);
      }
    });

    window.location.href = '/';
  }
  return response;
};

export const isAdmin = (): boolean => {
  return getUserRole() === 'admin';
};

export const loadImages = (urls: string[]) => {
  return Promise.all(urls.map(loadImage));
};

export const loadImage = (url: string) => {
  return new Promise((res, rej) =>
    Object.assign(new Image(), {
      src: url,
      onload: function (e) {
        res(this);
      },
      onerror: rej,
    }),
  );
};
