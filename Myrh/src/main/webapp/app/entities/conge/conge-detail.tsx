import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './conge.reducer';
import { IConge } from 'app/shared/model/conge.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICongeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CongeDetail = (props: ICongeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { congeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="myrhApp.conge.detail.title">Conge</Translate> [<b>{congeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="idConge">
              <Translate contentKey="myrhApp.conge.idConge">Id Conge</Translate>
            </span>
          </dt>
          <dd>{congeEntity.idConge}</dd>
          <dt>
            <span id="dateDebut">
              <Translate contentKey="myrhApp.conge.dateDebut">Date Debut</Translate>
            </span>
          </dt>
          <dd>{congeEntity.dateDebut ? <TextFormat value={congeEntity.dateDebut} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="dateRetourEffective">
              <Translate contentKey="myrhApp.conge.dateRetourEffective">Date Retour Effective</Translate>
            </span>
          </dt>
          <dd>
            {congeEntity.dateRetourEffective ? (
              <TextFormat value={congeEntity.dateRetourEffective} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="myrhApp.conge.tracker">Tracker</Translate>
          </dt>
          <dd>{congeEntity.tracker ? congeEntity.tracker.id : ''}</dd>
          <dt>
            <Translate contentKey="myrhApp.conge.recuperation">Recuperation</Translate>
          </dt>
          <dd>{congeEntity.recuperation ? congeEntity.recuperation.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/conge" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/conge/${congeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ conge }: IRootState) => ({
  congeEntity: conge.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CongeDetail);
