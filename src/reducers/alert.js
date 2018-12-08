import * as types from '../constants/ActionTypes';

const initialState = {
  show: false
};

const alert = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_ALERT: {
      return {
        ...state,
        ...action.payload,
        show: true,
      }
    }
    case types.HIDE_ALERT: {
      return {
        ...state,
        show: false,
      }
    }
    default: {
      return state
    }
  }
};

export default alert;
