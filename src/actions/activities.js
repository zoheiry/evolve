import * as types from '../constants/ActionTypes';

const addActivityRequest = () => ({
  type: types.ADD_ACTIVITY_REQUEST
});

const addActivityFail = () => ({
  type: types.ADD_ACTIVITY_FAIL
});

const addActivitySuccess = (activity) => ({
  type: types.ADD_ACTIVITY_SUCCESS,
  payload: { activity }
});

const updateActivityRequest = () => ({
  type: types.UPDATE_ACTIVITY_REQUEST
});

const updateActivityFail = () => ({
  type: types.UPDATE_ACTIVITY_FAIL
});

const updateActivitySuccess = (activity) => ({
  type: types.UPDATE_ACTIVITY_SUCCESS,
  payload: { activity }
});

const requestActivities = () => ({
  type: types.REQUEST_ACTIVITIES
});

const requestActivitiesFail = () => ({
  type: types.REQUEST_ACTIVITIES_FAIL
});

const requestActivitiesSuccess = (activities) => ({
  type: types.REQUEST_ACTIVITIES_SUCCESS,
  payload: { activities }
});

const deleteActivityRequest = () => ({
  type: types.DELETE_ACTIVITIY_REQUEST
});

const deleteActivityFail = () => ({
  type: types.DELETE_ACTIVITIY_FAIL
});

const deleteActivitySuccess = (activityId) => ({
  type: types.DELETE_ACTIVITIY_SUCCESS,
  payload: { activityId },
});

export const addActivity = (activity, userId) => (dispatch, getState, api) => {
  dispatch(addActivityRequest());

  return api.addActivity(activity, userId)
    .then((activity) => dispatch(addActivitySuccess(activity)))
    .catch(() => dispatch(addActivityFail()));
};

export const getActivities = (userId) => (dispatch, getState, api) => {
  dispatch(requestActivities());

  return api.getUserActivities(userId)
    .then((activities) => dispatch(requestActivitiesSuccess(activities)))
    .catch(() => dispatch(requestActivitiesFail()));
};

export const updateActivity = (activity, userId) => (dispatch, getState, api) => {
  dispatch(updateActivityRequest());

  return api.updateActivity(activity, userId)
    .then((activity) => dispatch(updateActivitySuccess(activity)))
    .catch(() => dispatch(updateActivityFail()));
};

export const deleteActivity = (id) => (dispatch, getState, api) => {
  dispatch(deleteActivityRequest());

  return api.deleteActivity(id)
    .then(() => dispatch(deleteActivitySuccess(id)))
    .catch(() => dispatch(deleteActivityFail()))
};

export const startSession = (id, start) => (dispatch, getState, api) => {
  dispatch(updateActivityRequest());

  return api.startSession(id, start)
    .then((activity) => dispatch(updateActivitySuccess(activity)))
    .catch(() => dispatch(updateActivityFail()));
};

export const endSession = (id, end) => (dispatch, getState, api) => {
  dispatch(updateActivityRequest());

  return api.startSession(id, end)
    .then((activity) => dispatch(updateActivitySuccess(activity)))
    .catch(() => dispatch(updateActivityFail()));
};
