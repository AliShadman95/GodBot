/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

/* import { GlobalStyle } from '../styles/global-styles';
 */
import Dashboard from './pages/Dashboard';
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

        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}
