import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Recuperation from './recuperation';
import RecuperationDetail from './recuperation-detail';
import RecuperationUpdate from './recuperation-update';
import RecuperationDeleteDialog from './recuperation-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RecuperationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RecuperationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RecuperationDetail} />
      <ErrorBoundaryRoute path={match.url} component={Recuperation} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={RecuperationDeleteDialog} />
  </>
);

export default Routes;
