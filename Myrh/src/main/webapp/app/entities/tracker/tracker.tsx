import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './tracker.reducer';
import { ITracker } from 'app/shared/model/tracker.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITrackerProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Tracker = (props: ITrackerProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { trackerList, match, loading } = props;
  return (
    <div>
      <h2 id="tracker-heading">
        <Translate contentKey="myrhApp.tracker.home.title">Trackers</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="myrhApp.tracker.home.createLabel">Create new Tracker</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {trackerList && trackerList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="myrhApp.tracker.idConge">Id Conge</Translate>
                </th>
                <th>
                  <Translate contentKey="myrhApp.tracker.step">Step</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {trackerList.map((tracker, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${tracker.id}`} color="link" size="sm">
                      {tracker.id}
                    </Button>
                  </td>
                  <td>{tracker.idConge}</td>
                  <td>{tracker.step}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${tracker.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tracker.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tracker.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="myrhApp.tracker.home.notFound">No Trackers found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ tracker }: IRootState) => ({
  trackerList: tracker.entities,
  loading: tracker.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Tracker);
