import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IConge } from 'app/shared/model/conge.model';
import { getEntities as getConges } from 'app/entities/conge/conge.reducer';
import { getEntity, updateEntity, createEntity, reset } from './tracker.reducer';
import { ITracker } from 'app/shared/model/tracker.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITrackerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TrackerUpdate = (props: ITrackerUpdateProps) => {
  const [congeId, setCongeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { trackerEntity, conges, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/tracker');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getConges();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...trackerEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="myrhApp.tracker.home.createOrEditLabel">
            <Translate contentKey="myrhApp.tracker.home.createOrEditLabel">Create or edit a Tracker</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : trackerEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="tracker-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="tracker-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="idCongeLabel" for="tracker-idConge">
                  <Translate contentKey="myrhApp.tracker.idConge">Id Conge</Translate>
                </Label>
                <AvField
                  id="tracker-idConge"
                  type="string"
                  className="form-control"
                  name="idConge"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="stepLabel" for="tracker-step">
                  <Translate contentKey="myrhApp.tracker.step">Step</Translate>
                </Label>
                <AvField
                  id="tracker-step"
                  type="string"
                  className="form-control"
                  name="step"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/tracker" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  conges: storeState.conge.entities,
  trackerEntity: storeState.tracker.entity,
  loading: storeState.tracker.loading,
  updating: storeState.tracker.updating,
  updateSuccess: storeState.tracker.updateSuccess,
});

const mapDispatchToProps = {
  getConges,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TrackerUpdate);
