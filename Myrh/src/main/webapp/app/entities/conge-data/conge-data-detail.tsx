import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './conge-data.reducer';
import { ICongeData } from 'app/shared/model/conge-data.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICongeDataDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CongeDataDetail = (props: ICongeDataDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { congeDataEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="myrhApp.congeData.detail.title">CongeData</Translate> [<b>{congeDataEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="idConge">
              <Translate contentKey="myrhApp.congeData.idConge">Id Conge</Translate>
            </span>
          </dt>
          <dd>{congeDataEntity.idConge}</dd>
          <dt>
            <span id="nbrJour">
              <Translate contentKey="myrhApp.congeData.nbrJour">Nbr Jour</Translate>
            </span>
          </dt>
          <dd>
            {congeDataEntity.nbrJour ? <TextFormat value={congeDataEntity.nbrJour} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="dateRetour">
              <Translate contentKey="myrhApp.congeData.dateRetour">Date Retour</Translate>
            </span>
          </dt>
          <dd>
            {congeDataEntity.dateRetour ? (
              <TextFormat value={congeDataEntity.dateRetour} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="myrhApp.congeData.conge">Conge</Translate>
          </dt>
          <dd>{congeDataEntity.conge ? congeDataEntity.conge.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/conge-data" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/conge-data/${congeDataEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ congeData }: IRootState) => ({
  congeDataEntity: congeData.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CongeDataDetail);
