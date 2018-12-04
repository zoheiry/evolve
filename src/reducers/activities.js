import { remove, get } from 'lodash';
import * as types from '../constants/ActionTypes';

const initialState = {
  items: [],
  isFetching: false
};

const activities = (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_ACTIVITIES:
    case types.ADD_ACTIVITY_REQUEST:
    case types.UPDATE_ACTIVITY_REQUEST:
    case types.DELETE_ACTIVITIY_REQUEST: {
      return {
        ...state,
        isFetching: true
      };
    }
    case types.REQUEST_ACTIVITIES_FAIL:
    case types.ADD_ACTIVITY_FAIL:
    case types.UPDATE_ACTIVITY_FAIL:
    case types.DELETE_ACTIVITIY_FAIL: {
      return {
        ...state,
        isFetching: false
      };
    }
    case types.ADD_ACTIVITY_SUCCESS: {
      const items = [...state.items];
      items.push(action.payload.activity);
      return {
        ...state,
        isFetching: false,
        items
      }
    }
    case types.REQUEST_ACTIVITIES_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        items: action.payload.activities
      };
    }
    case types.UPDATE_ACTIVITY_SUCCESS: {
      const items = [...state.items];
      remove(items, (activity) => activity.id === get(action, 'payload.activity.id'));
      items.push(action.payload.activity);
      return {
        ...state,
        isFetching: false,
        items,
      }
    }
    case types.DELETE_ACTIVITIY_SUCCESS: {
      const items = [...state.items];
      remove(items, (activity) => activity.id === get(action, 'payload.activityId'));
      return {
        ...state,
        isFetching: false,
        items,
      }
    }
    default:
      return state
  }
}

export default activities;
