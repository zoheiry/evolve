import * as types from '../constants/ActionTypes';

const initialState = {
  items: [],
  isFetching: false
};

const activities = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_ACTIVITY_REQUEST: {
      return {
        ...state,
        isFetching: true
      };
    }
    case types.ADD_ACTIVITY_FAIL: {
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
    case types.REQUEST_ACTIVITIES: {
      return {
        ...state,
        isFetching: true
      };
    }
    case types.REQUEST_ACTIVITIES_FAIL: {
      return {
        ...state,
        isFetching: false
      };
    }
    case types.REQUEST_ACTIVITIES_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        items: action.payload.activities
      };
    }
    default:
      return state
  }
}

export default activities;
