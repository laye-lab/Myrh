import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITracker } from 'app/shared/model/tracker.model';
import { getEntities as getTrackers } from 'app/entities/tracker/tracker.reducer';
import { IRecuperation } from 'app/shared/model/recuperation.model';
import { getEntities as getRecuperations } from 'app/entities/recuperation/recuperation.reducer';
import { getEntity, updateEntity, createEntity, reset } from './conge.reducer';
import { IConge } from 'app/shared/model/conge.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICongeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CongeUpdate = (props: ICongeUpdateProps) => {
  const [trackerId, setTrackerId] = useState('0');
  const [recuperationId, setRecuperationId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { congeEntity, trackers, recuperations, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/conge');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getTrackers();
    props.getRecuperations();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...congeEntity,
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
          <h2 id="myrhApp.conge.home.createOrEditLabel">
            <Translate contentKey="myrhApp.conge.home.createOrEditLabel">Create or edit a Conge</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : congeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="conge-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="conge-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="idCongeLabel" for="conge-idConge">
                  <Translate contentKey="myrhApp.conge.idConge">Id Conge</Translate>
                </Label>
                <AvField
                  id="conge-idConge"
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
                <Label id="dateDebutLabel" for="conge-dateDebut">
                  <Translate contentKey="myrhApp.conge.dateDebut">Date Debut</Translate>
                </Label>
                <AvField
                  id="conge-dateDebut"
                  type="date"
                  className="form-control"
                  name="dateDebut"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dateRetourEffectiveLabel" for="conge-dateRetourEffective">
                  <Translate contentKey="myrhApp.conge.dateRetourEffective">Date Retour Effective</Translate>
                </Label>
                <AvField
                  id="conge-dateRetourEffective"
                  type="date"
                  className="form-control"
                  name="dateRetourEffective"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="conge-tracker">
                  <Translate contentKey="myrhApp.conge.tracker">Tracker</Translate>
                </Label>
                <AvInput id="conge-tracker" type="select" className="form-control" name="tracker.id">
                  <option value="" key="0" />
                  {trackers
                    ? trackers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="conge-recuperation">
                  <Translate contentKey="myrhApp.conge.recuperation">Recuperation</Translate>
                </Label>
                <AvInput id="conge-recuperation" type="select" className="form-control" name="recuperation.id">
                  <option value="" key="0" />
                  {recuperations
                    ? recuperations.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/conge" replace color="info">
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
  trackers: storeState.tracker.entities,
  recuperations: storeState.recuperation.entities,
  congeEntity: storeState.conge.entity,
  loading: storeState.conge.loading,
  updating: storeState.conge.updating,
  updateSuccess: storeState.conge.updateSuccess,
});

const mapDispatchToProps = {
  getTrackers,
  getRecuperations,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CongeUpdate);
