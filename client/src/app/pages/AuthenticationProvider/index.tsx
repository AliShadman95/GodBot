import React, { useEffect } from 'react';
import { Login } from '../Login';
import { CircularProgress } from '@mui/material';
import { getToken } from 'utils/api';
import { useAuthenticationProviderSlice } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import AlertInfo from '../Alert';
import { selectAuthenticationProvider } from './slice/selectors';

export const AuthenticationProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { actions } = useAuthenticationProviderSlice();
  const { loading } = useSelector(selectAuthenticationProvider);

  const token = getToken();

  useEffect(() => {
    dispatch(actions.verifyTokenAction());
  }, []);

  if (token) {
    return children;
  }
  return (
    <React.Fragment>
      {loading ? (
        <CircularProgress color="inherit" size={20} />
      ) : (
        <React.Fragment>
          {' '}
          <AlertInfo />
          <Login />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
