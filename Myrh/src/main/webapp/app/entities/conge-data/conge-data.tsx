import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './conge-data.reducer';
import { ICongeData } from 'app/shared/model/conge-data.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICongeDataProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const CongeData = (props: ICongeDataProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { congeDataList, match, loading } = props;
  return (
    <div>
      <h2 id="conge-data-heading">
        <Translate contentKey="myrhApp.congeData.home.title">Conge Data</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="myrhApp.congeData.home.createLabel">Create new Conge Data</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {congeDataList && congeDataList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="myrhApp.congeData.idConge">Id Conge</Translate>
                </th>
                <th>
                  <Translate contentKey="myrhApp.congeData.nbrJour">Nbr Jour</Translate>
                </th>
                <th>
                  <Translate contentKey="myrhApp.congeData.dateRetour">Date Retour</Translate>
                </th>
                <th>
                  <Translate contentKey="myrhApp.congeData.conge">Conge</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {congeDataList.map((congeData, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${congeData.id}`} color="link" size="sm">
                      {congeData.id}
                    </Button>
                  </td>
                  <td>{congeData.idConge}</td>
                  <td>{congeData.nbrJour ? <TextFormat type="date" value={congeData.nbrJour} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>
                    {congeData.dateRetour ? <TextFormat type="date" value={congeData.dateRetour} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{congeData.conge ? <Link to={`conge/${congeData.conge.id}`}>{congeData.conge.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${congeData.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${congeData.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${congeData.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="myrhApp.congeData.home.notFound">No Conge Data found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ congeData }: IRootState) => ({
  congeDataList: congeData.entities,
  loading: congeData.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CongeData);
