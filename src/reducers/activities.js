import { remove, get } from 'lodash';
import * as types from '../constants/ActionTypes';

const initialState = {
  items: [],
  suggestedActivity: {
    isFetching: false
  },
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
    case types.START_SESSION_SUCCESS: {
      const items = state.items.map(activity => {
        if (activity.id === action.payload.id) {
          return {
            ...activity,
            activeSession: action.payload.activeSession
          }
        }
        return activity;
      });
      return {
        ...state,
        isFetching: false,
        items,
      };
    }
    case types.END_SESSION_SUCCESS: {
      const items = state.items.map(activity => {
        if (activity.id === action.payload.id) {
          return {
            ...activity,
            activeSession: {},
            sessions: action.payload.sessions
          }
        }
        return activity;
      });
      return {
        ...state,
        isFetching: false,
        items,
      };
    }
    case types.REQUEST_SUGGESTED_ACTIVITY: {
      return {
        ...state,
        suggestedActivity: {
          ...state.suggestedActivity,
          isFetching: true
        }
      }
    }
    case types.REQUEST_SUGGESTED_ACTIVITY_FAIL: {
      return {
        ...state,
        suggestedActivity: {
          ...state.suggestedActivity,
          isFetching: false
        }
      };
    }
    case types.REQUEST_SUGGESTED_ACTIVITY_SUCCESS: {
      return {
        ...state,
        suggestedActivity: {
          ...action.payload.activity,
          isFetching: false
        }
      };
    }
    default:
      return state
  }
}

export default activities;
