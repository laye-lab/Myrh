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
import { getEntity, updateEntity, createEntity, reset } from './recuperation.reducer';
import { IRecuperation } from 'app/shared/model/recuperation.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRecuperationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RecuperationUpdate = (props: IRecuperationUpdateProps) => {
  const [congeId, setCongeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { recuperationEntity, conges, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/recuperation');
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
        ...recuperationEntity,
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
          <h2 id="myrhApp.recuperation.home.createOrEditLabel">
            <Translate contentKey="myrhApp.recuperation.home.createOrEditLabel">Create or edit a Recuperation</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : recuperationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="recuperation-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="recuperation-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="idCongeLabel" for="recuperation-idConge">
                  <Translate contentKey="myrhApp.recuperation.idConge">Id Conge</Translate>
                </Label>
                <AvField
                  id="recuperation-idConge"
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
                <Label id="nbrJourLabel" for="recuperation-nbrJour">
                  <Translate contentKey="myrhApp.recuperation.nbrJour">Nbr Jour</Translate>
                </Label>
                <AvField
                  id="recuperation-nbrJour"
                  type="string"
                  className="form-control"
                  name="nbrJour"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/recuperation" replace color="info">
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
  recuperationEntity: storeState.recuperation.entity,
  loading: storeState.recuperation.loading,
  updating: storeState.recuperation.updating,
  updateSuccess: storeState.recuperation.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(RecuperationUpdate);
