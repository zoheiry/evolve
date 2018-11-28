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

export const getUser = (id) => (dispatch, getState, api) => {
  dispatch(requestUser());
  return api.getUser(id)
    .then(user => dispatch(requestUserSuccess(user)))
    .catch(() => dispatch(requestUserFail()));
};

export const updateSchedule = (weekDays, userId) => (dispatch, getState, api) => {
  dispatch(updateScheduleRequest);
  return api.updateSchedule(weekDays, userId)
    .then(data => dispatch(updateScheduleSuccess(data)))
    .catch(() => dispatch(updateScheduleFail()));
};
