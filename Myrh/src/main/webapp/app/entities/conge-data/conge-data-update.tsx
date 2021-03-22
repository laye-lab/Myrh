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
import { getEntity, updateEntity, createEntity, reset } from './conge-data.reducer';
import { ICongeData } from 'app/shared/model/conge-data.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICongeDataUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CongeDataUpdate = (props: ICongeDataUpdateProps) => {
  const [congeId, setCongeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { congeDataEntity, conges, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/conge-data');
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
        ...congeDataEntity,
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
          <h2 id="myrhApp.congeData.home.createOrEditLabel">
            <Translate contentKey="myrhApp.congeData.home.createOrEditLabel">Create or edit a CongeData</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : congeDataEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="conge-data-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="conge-data-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="idCongeLabel" for="conge-data-idConge">
                  <Translate contentKey="myrhApp.congeData.idConge">Id Conge</Translate>
                </Label>
                <AvField
                  id="conge-data-idConge"
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
                <Label id="nbrJourLabel" for="conge-data-nbrJour">
                  <Translate contentKey="myrhApp.congeData.nbrJour">Nbr Jour</Translate>
                </Label>
                <AvField
                  id="conge-data-nbrJour"
                  type="date"
                  className="form-control"
                  name="nbrJour"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dateRetourLabel" for="conge-data-dateRetour">
                  <Translate contentKey="myrhApp.congeData.dateRetour">Date Retour</Translate>
                </Label>
                <AvField
                  id="conge-data-dateRetour"
                  type="date"
                  className="form-control"
                  name="dateRetour"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="conge-data-conge">
                  <Translate contentKey="myrhApp.congeData.conge">Conge</Translate>
                </Label>
                <AvInput id="conge-data-conge" type="select" className="form-control" name="conge.id">
                  <option value="" key="0" />
                  {conges
                    ? conges.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/conge-data" replace color="info">
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
  congeDataEntity: storeState.congeData.entity,
  loading: storeState.congeData.loading,
  updating: storeState.congeData.updating,
  updateSuccess: storeState.congeData.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(CongeDataUpdate);
