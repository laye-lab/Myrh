import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITracker, defaultValue } from 'app/shared/model/tracker.model';

export const ACTION_TYPES = {
  FETCH_TRACKER_LIST: 'tracker/FETCH_TRACKER_LIST',
  FETCH_TRACKER: 'tracker/FETCH_TRACKER',
  CREATE_TRACKER: 'tracker/CREATE_TRACKER',
  UPDATE_TRACKER: 'tracker/UPDATE_TRACKER',
  DELETE_TRACKER: 'tracker/DELETE_TRACKER',
  RESET: 'tracker/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITracker>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type TrackerState = Readonly<typeof initialState>;

// Reducer

export default (state: TrackerState = initialState, action): TrackerState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TRACKER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TRACKER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_TRACKER):
    case REQUEST(ACTION_TYPES.UPDATE_TRACKER):
    case REQUEST(ACTION_TYPES.DELETE_TRACKER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_TRACKER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TRACKER):
    case FAILURE(ACTION_TYPES.CREATE_TRACKER):
    case FAILURE(ACTION_TYPES.UPDATE_TRACKER):
    case FAILURE(ACTION_TYPES.DELETE_TRACKER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRACKER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRACKER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_TRACKER):
    case SUCCESS(ACTION_TYPES.UPDATE_TRACKER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_TRACKER):
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

const apiUrl = 'api/trackers';

// Actions

export const getEntities: ICrudGetAllAction<ITracker> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TRACKER_LIST,
  payload: axios.get<ITracker>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ITracker> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TRACKER,
    payload: axios.get<ITracker>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ITracker> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TRACKER,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITracker> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TRACKER,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITracker> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TRACKER,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
