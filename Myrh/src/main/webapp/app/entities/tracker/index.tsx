import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Tracker from './tracker';
import TrackerDetail from './tracker-detail';
import TrackerUpdate from './tracker-update';
import TrackerDeleteDialog from './tracker-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TrackerUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TrackerUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TrackerDetail} />
      <ErrorBoundaryRoute path={match.url} component={Tracker} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TrackerDeleteDialog} />
  </>
);

export default Routes;
