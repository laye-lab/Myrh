import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRecuperation, defaultValue } from 'app/shared/model/recuperation.model';

export const ACTION_TYPES = {
  FETCH_RECUPERATION_LIST: 'recuperation/FETCH_RECUPERATION_LIST',
  FETCH_RECUPERATION: 'recuperation/FETCH_RECUPERATION',
  CREATE_RECUPERATION: 'recuperation/CREATE_RECUPERATION',
  UPDATE_RECUPERATION: 'recuperation/UPDATE_RECUPERATION',
  DELETE_RECUPERATION: 'recuperation/DELETE_RECUPERATION',
  RESET: 'recuperation/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRecuperation>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type RecuperationState = Readonly<typeof initialState>;

// Reducer

export default (state: RecuperationState = initialState, action): RecuperationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_RECUPERATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RECUPERATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_RECUPERATION):
    case REQUEST(ACTION_TYPES.UPDATE_RECUPERATION):
    case REQUEST(ACTION_TYPES.DELETE_RECUPERATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_RECUPERATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RECUPERATION):
    case FAILURE(ACTION_TYPES.CREATE_RECUPERATION):
    case FAILURE(ACTION_TYPES.UPDATE_RECUPERATION):
    case FAILURE(ACTION_TYPES.DELETE_RECUPERATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_RECUPERATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_RECUPERATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_RECUPERATION):
    case SUCCESS(ACTION_TYPES.UPDATE_RECUPERATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_RECUPERATION):
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

const apiUrl = 'api/recuperations';

// Actions

export const getEntities: ICrudGetAllAction<IRecuperation> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_RECUPERATION_LIST,
  payload: axios.get<IRecuperation>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IRecuperation> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RECUPERATION,
    payload: axios.get<IRecuperation>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IRecuperation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RECUPERATION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRecuperation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RECUPERATION,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRecuperation> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RECUPERATION,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
