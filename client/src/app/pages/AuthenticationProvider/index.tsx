import React, { useEffect } from 'react';
import { Login } from '../Login';
import { CircularProgress, Grid } from '@mui/material';
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
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            minHeight: '100vh',
            alignItems: 'center',
          }}
        >
          <Grid item>
            {' '}
            <CircularProgress size={80} />
          </Grid>
        </Grid>
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
