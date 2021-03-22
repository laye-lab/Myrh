import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Conge from './conge';
import CongeData from './conge-data';
import Tracker from './tracker';
import Recuperation from './recuperation';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}conge`} component={Conge} />
      <ErrorBoundaryRoute path={`${match.url}conge-data`} component={CongeData} />
      <ErrorBoundaryRoute path={`${match.url}tracker`} component={Tracker} />
      <ErrorBoundaryRoute path={`${match.url}recuperation`} component={Recuperation} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
