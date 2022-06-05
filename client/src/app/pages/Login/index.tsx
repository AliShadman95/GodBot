import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Input from 'app/components/Fields/Input';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useAuthenticationProviderSlice } from '../AuthenticationProvider/slice';
import Copyright from 'app/components/Copyright';

export function Login() {
  const dispatch = useDispatch();

  const { actions } = useAuthenticationProviderSlice();

  const { control, handleSubmit } = useForm({});

  const onSubmit = data => {
    dispatch(actions.retrieveTokenAction(data));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar
          sx={{ m: 1 }}
          src="https://cdn-icons-png.flaticon.com/512/2534/2534504.png"
        >
          {/*  <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <Input
            id="username"
            name="username"
            label="Username"
            margin="normal"
            fullWidth
            control={control}
            rules={{ required: true }}
            autoFocus
            autoComplete="email"
            required
          />
          <Input
            id="password"
            name="password"
            label="Password"
            type="password"
            margin="normal"
            fullWidth
            control={control}
            rules={{ required: true }}
            autoComplete="current-password"
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
