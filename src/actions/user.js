import * as types from '../constants/ActionTypes';

const requestUser = () => ({ type: types.REQUEST_USER });

const requestUserSuccess = (user) => ({
  type: types.REQUEST_USER_SUCCESS,
  payload: { user }
})

const requestUserFail = () => ({ type: types.REQUEST_USER_FAIL });

const updateScheduleRequest = () => ({ type: types.UPDATE_SCHEDULE_REQUEST });

const updateScheduleSuccess = (schedule) => ({
  type: types.UPDATE_SCHEDULE_SUCCESS,
  payload: { schedule }
});

const updateScheduleFail = () => ({ type: types.UPDATE_SCHEDULE_FAIL });

const authenticateUserRequest = () => ({ type: types.AUTHENTICATE_USER_REQUEST });

const authenticateUserSuccess = (user) => ({
  type: types.AUTHENTICATE_USER_SUCCESS,
  payload: { user }
})

const authenticateUserFail = (error) => ({
  type: types.AUTHENTICATE_USER_FAIL,
  payload: { error },
});

export const getUser = () => (dispatch, getState, api) => {
  dispatch(requestUser());
  return api.getUser()
    .then(user => dispatch(requestUserSuccess(user)))
    .catch(() => dispatch(requestUserFail()));
};

export const updateSchedule = (schedule, userId) => (dispatch, getState, api) => {
  dispatch(updateScheduleRequest());
  return api.updateSchedule(schedule, userId)
    .then(schedule => dispatch(updateScheduleSuccess(schedule)))
    .catch(() => dispatch(updateScheduleFail()));
};

export const authenticateUser = (email, password) => (dispatch, getState, api) => {
  dispatch(authenticateUserRequest());

  return api.authenticateUser(email, password)
    .then((data) => {
      dispatch(authenticateUserSuccess(data.user));
      return data;
    })
    .catch((error) => {
      dispatch(authenticateUserFail(error));
      return error;
    })
}
