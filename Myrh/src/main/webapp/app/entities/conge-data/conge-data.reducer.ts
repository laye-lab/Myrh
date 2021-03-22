import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICongeData, defaultValue } from 'app/shared/model/conge-data.model';

export const ACTION_TYPES = {
  FETCH_CONGEDATA_LIST: 'congeData/FETCH_CONGEDATA_LIST',
  FETCH_CONGEDATA: 'congeData/FETCH_CONGEDATA',
  CREATE_CONGEDATA: 'congeData/CREATE_CONGEDATA',
  UPDATE_CONGEDATA: 'congeData/UPDATE_CONGEDATA',
  DELETE_CONGEDATA: 'congeData/DELETE_CONGEDATA',
  RESET: 'congeData/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICongeData>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type CongeDataState = Readonly<typeof initialState>;

// Reducer

export default (state: CongeDataState = initialState, action): CongeDataState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CONGEDATA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CONGEDATA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_CONGEDATA):
    case REQUEST(ACTION_TYPES.UPDATE_CONGEDATA):
    case REQUEST(ACTION_TYPES.DELETE_CONGEDATA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_CONGEDATA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CONGEDATA):
    case FAILURE(ACTION_TYPES.CREATE_CONGEDATA):
    case FAILURE(ACTION_TYPES.UPDATE_CONGEDATA):
    case FAILURE(ACTION_TYPES.DELETE_CONGEDATA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONGEDATA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONGEDATA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_CONGEDATA):
    case SUCCESS(ACTION_TYPES.UPDATE_CONGEDATA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_CONGEDATA):
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

const apiUrl = 'api/conge-data';

// Actions

export const getEntities: ICrudGetAllAction<ICongeData> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CONGEDATA_LIST,
  payload: axios.get<ICongeData>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ICongeData> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CONGEDATA,
    payload: axios.get<ICongeData>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ICongeData> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CONGEDATA,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICongeData> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CONGEDATA,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICongeData> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CONGEDATA,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
