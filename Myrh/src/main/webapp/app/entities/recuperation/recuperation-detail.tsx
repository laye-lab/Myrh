import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './recuperation.reducer';
import { IRecuperation } from 'app/shared/model/recuperation.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRecuperationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RecuperationDetail = (props: IRecuperationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { recuperationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="myrhApp.recuperation.detail.title">Recuperation</Translate> [<b>{recuperationEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="idConge">
              <Translate contentKey="myrhApp.recuperation.idConge">Id Conge</Translate>
            </span>
          </dt>
          <dd>{recuperationEntity.idConge}</dd>
          <dt>
            <span id="nbrJour">
              <Translate contentKey="myrhApp.recuperation.nbrJour">Nbr Jour</Translate>
            </span>
          </dt>
          <dd>{recuperationEntity.nbrJour}</dd>
        </dl>
        <Button tag={Link} to="/recuperation" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/recuperation/${recuperationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ recuperation }: IRootState) => ({
  recuperationEntity: recuperation.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RecuperationDetail);
