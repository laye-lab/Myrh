import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CongeData from './conge-data';
import CongeDataDetail from './conge-data-detail';
import CongeDataUpdate from './conge-data-update';
import CongeDataDeleteDialog from './conge-data-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CongeDataUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CongeDataUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CongeDataDetail} />
      <ErrorBoundaryRoute path={match.url} component={CongeData} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CongeDataDeleteDialog} />
  </>
);

export default Routes;
