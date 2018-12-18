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

const createUserRequest = () => ({ type: types.CREATE_USER_REQUEST });

const createUserFail = (error) => ({
  type: types.CREATE_USER_FAIL,
  payload: { error },
});

const createUserSuccess = (user) => ({
  type: types.CREATE_USER_SUCCESS,
  payload: { user },
});

const updateUserRequest = () => ({ type: types.UPDATE_USER_REQUEST });

const updateUserFail = () => ({ type: types.UPDATE_USER_FAIL });

const updateUserSuccess = (user) => ({
  type: types.UPDATE_USER_SUCCESS,
  payload: { user },
});

export const getUser = () => (dispatch, getState, api) => {
  dispatch(requestUser());
  return api.getUser()
    .then(user => dispatch(requestUserSuccess(user)))
    .catch(() => dispatch(requestUserFail()));
};

export const updateSchedule = (schedule) => (dispatch, getState, api) => {
  dispatch(updateScheduleRequest());
  return api.updateSchedule(schedule)
    .then(schedule => dispatch(updateScheduleSuccess(schedule)))
    .catch(() => dispatch(updateScheduleFail()));
};

export const authenticateUser = (userInfo) => (dispatch, getState, api) => {
  dispatch(authenticateUserRequest());

  return api.authenticateUser(userInfo)
    .then((data) => {
      dispatch(authenticateUserSuccess(data.user));
      return data;
    })
    .catch((error) => {
      dispatch(authenticateUserFail(error));
      return error;
    })
};

export const createUser = (userInfo) => (dispatch, getState, api) => {
  dispatch(createUserRequest());

  return api.createUser(userInfo)
    .then((data) => {
      dispatch(createUserSuccess(data.user));
      return data;
    })
    .catch((error) => {
      dispatch(createUserFail(error));
      return error;
    })
};

export const changeOnBoardingState = (state) => (dispatch, getState, api) => {
  dispatch(updateScheduleRequest());

  return api.changeOnBoardingState(state)
  .then((data) => dispatch(updateUserSuccess(data.user)))
  .catch((error) => dispatch(updateUserFail(error)));
};
