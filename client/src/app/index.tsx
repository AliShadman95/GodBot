/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';

export function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/dashboard" />

        <Route
          path={process.env.PUBLIC_URL + '/dashboard'}
          component={Dashboard}
        />

        <Route
          path={process.env.PUBLIC_URL + '/leaderboard/:id'}
          component={Leaderboard}
        />

        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}
