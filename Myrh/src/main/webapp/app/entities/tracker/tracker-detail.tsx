import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './tracker.reducer';
import { ITracker } from 'app/shared/model/tracker.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITrackerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TrackerDetail = (props: ITrackerDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { trackerEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="myrhApp.tracker.detail.title">Tracker</Translate> [<b>{trackerEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="idConge">
              <Translate contentKey="myrhApp.tracker.idConge">Id Conge</Translate>
            </span>
          </dt>
          <dd>{trackerEntity.idConge}</dd>
          <dt>
            <span id="step">
              <Translate contentKey="myrhApp.tracker.step">Step</Translate>
            </span>
          </dt>
          <dd>{trackerEntity.step}</dd>
        </dl>
        <Button tag={Link} to="/tracker" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/tracker/${trackerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ tracker }: IRootState) => ({
  trackerEntity: tracker.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TrackerDetail);
