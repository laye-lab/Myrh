import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IConge, defaultValue } from 'app/shared/model/conge.model';

export const ACTION_TYPES = {
  FETCH_CONGE_LIST: 'conge/FETCH_CONGE_LIST',
  FETCH_CONGE: 'conge/FETCH_CONGE',
  CREATE_CONGE: 'conge/CREATE_CONGE',
  UPDATE_CONGE: 'conge/UPDATE_CONGE',
  DELETE_CONGE: 'conge/DELETE_CONGE',
  RESET: 'conge/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IConge>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type CongeState = Readonly<typeof initialState>;

// Reducer

export default (state: CongeState = initialState, action): CongeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CONGE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CONGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_CONGE):
    case REQUEST(ACTION_TYPES.UPDATE_CONGE):
    case REQUEST(ACTION_TYPES.DELETE_CONGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_CONGE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CONGE):
    case FAILURE(ACTION_TYPES.CREATE_CONGE):
    case FAILURE(ACTION_TYPES.UPDATE_CONGE):
    case FAILURE(ACTION_TYPES.DELETE_CONGE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONGE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONGE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_CONGE):
    case SUCCESS(ACTION_TYPES.UPDATE_CONGE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_CONGE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/conges';

// Actions

export const getEntities: ICrudGetAllAction<IConge> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CONGE_LIST,
  payload: axios.get<IConge>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IConge> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CONGE,
    payload: axios.get<IConge>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IConge> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CONGE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IConge> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CONGE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IConge> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CONGE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
