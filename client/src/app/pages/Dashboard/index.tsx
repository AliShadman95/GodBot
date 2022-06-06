/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useDispatch } from 'react-redux';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Rank from '../Ranks/Rank';
import Settings from '../Ranks/Settings';
import GiveXp from '../Ranks/GiveXp';
import RemoveXp from '../Ranks/RemoveXp';
import { useDashboardSlice } from './slice/index';
import PrimaryNavBar from '../PrimaryNavBar';
import Copyright from 'app/components/Copyright';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { actions } = useDashboardSlice();
  let { path } = useRouteMatch();

  React.useEffect(() => {
    dispatch(actions.getSettingsAction());
    dispatch(actions.getCardAction());
    dispatch(actions.getVoiceChannelsAction());
    dispatch(actions.getTextChannelsAction());
    dispatch(actions.getRolesAction());
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <PrimaryNavBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Switch>
                <Redirect exact from={`${path}`} to={`${path}/rank`} />
                <Route path={`${path}/rank`}>
                  <Rank />
                </Route>
                <Route path={`${path}/settings`}>
                  <Settings />
                </Route>
                <Route path={`${path}/give-xp`}>
                  <GiveXp />
                </Route>
                <Route path={`${path}/remove-xp`}>
                  <RemoveXp />
                </Route>
              </Switch>
            </Grid>
          </Grid>

          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  );
}
