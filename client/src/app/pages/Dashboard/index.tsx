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
import RankSettings from '../Ranks/Settings';
import Settings from '../Settings';
import GiveXp from '../Ranks/GiveXp';
import RemoveXp from '../Ranks/RemoveXp';
import { useDashboardSlice } from './slice/index';
import PrimaryNavBar from '../PrimaryNavBar';
import Copyright from 'app/components/Copyright';
import { getIdDiscord, getUsername } from 'utils/api';
import AlertInfo from '../Alert';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { actions } = useDashboardSlice();
  let { path } = useRouteMatch();

  React.useEffect(() => {
    dispatch(actions.getSettingsAction());
    dispatch(actions.getAllRanksAction());
    dispatch(actions.getVoiceChannelsAction());
    dispatch(actions.getTextChannelsAction());

    dispatch(actions.getRolesAction());
    dispatch(
      actions.getRankUserAction({
        id: getIdDiscord(),
        username: getUsername(),
      }),
    );

    return () => {
      dispatch(actions.clearDashboardState());
    };
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
          <AlertInfo />
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Switch>
                <Redirect exact from={`${path}`} to={`${path}/rank/rank`} />
                <Route path={`${path}/rank/rank`}>
                  <Rank />
                </Route>
                <Route path={`${path}/settings`}>
                  <Settings />
                </Route>
                <Route path={`${path}/rank/settings`}>
                  <RankSettings />
                </Route>
                <Route path={`${path}/rank/give-xp`}>
                  <GiveXp />
                </Route>
                <Route path={`${path}/rank/remove-xp`}>
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
