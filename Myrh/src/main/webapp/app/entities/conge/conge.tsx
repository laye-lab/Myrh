import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './conge.reducer';
import { IConge } from 'app/shared/model/conge.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICongeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Conge = (props: ICongeProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { congeList, match, loading } = props;
  return (
    <div>
      <h2 id="conge-heading">
        <Translate contentKey="myrhApp.conge.home.title">Conges</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="myrhApp.conge.home.createLabel">Create new Conge</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {congeList && congeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="myrhApp.conge.idConge">Id Conge</Translate>
                </th>
                <th>
                  <Translate contentKey="myrhApp.conge.dateDebut">Date Debut</Translate>
                </th>
                <th>
                  <Translate contentKey="myrhApp.conge.dateRetourEffective">Date Retour Effective</Translate>
                </th>
                <th>
                  <Translate contentKey="myrhApp.conge.tracker">Tracker</Translate>
                </th>
                <th>
                  <Translate contentKey="myrhApp.conge.recuperation">Recuperation</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {congeList.map((conge, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${conge.id}`} color="link" size="sm">
                      {conge.id}
                    </Button>
                  </td>
                  <td>{conge.idConge}</td>
                  <td>{conge.dateDebut ? <TextFormat type="date" value={conge.dateDebut} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>
                    {conge.dateRetourEffective ? (
                      <TextFormat type="date" value={conge.dateRetourEffective} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{conge.tracker ? <Link to={`tracker/${conge.tracker.id}`}>{conge.tracker.id}</Link> : ''}</td>
                  <td>{conge.recuperation ? <Link to={`recuperation/${conge.recuperation.id}`}>{conge.recuperation.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${conge.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${conge.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${conge.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="myrhApp.conge.home.notFound">No Conges found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ conge }: IRootState) => ({
  congeList: conge.entities,
  loading: conge.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Conge);
