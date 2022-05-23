import React from 'react';
import { Login } from '../Login';

export const AuthenticationProvider = ({ children }) => {
  const isLogged = false;

  if (!isLogged) return <Login />;

  return children;
};
