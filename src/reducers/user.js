import * as types from '../constants/ActionTypes';

const initialState = {
  id: null,
  email: null,
  schedule: {
    isFetching: false,
    weekDays: null
  },
  isFetching: false
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_USER: {
      return {
        ...state,
        isFetching: true
      };
    }
    case types.REQUEST_USER_SUCCESS: {
      return {
        ...action.payload.user,
        isFetching: false
      }
    }
    case types.REQUEST_USER_FAIL: {
      return {
        ...state,
        isFetching: false
      }
    }
    case types.UPDATE_SCHEDULE_REQUEST: {
      return {
        ...state,
        schedule: {
          ...state.schedule,
          isFetching: true
        }
      }
    }
    case types.UPDATE_SCHEDULE_SUCCESS: {
      return {
        ...state,
        schedule: {
          isFetching: false,
          weekDays: action.payload.weekDays
        }
      }
    }
    case types.UPDATE_SCHEDULE_FAIL: {
      return {
        ...state,
        schedule: {
          ...state.schedule,
          isFetching: false
        }
      }
    }
    default:
      return state;
  }
};

export default user;
