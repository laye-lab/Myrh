import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Conge from './conge';
import CongeDetail from './conge-detail';
import CongeUpdate from './conge-update';
import CongeDeleteDialog from './conge-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CongeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CongeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CongeDetail} />
      <ErrorBoundaryRoute path={match.url} component={Conge} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CongeDeleteDialog} />
  </>
);

export default Routes;
