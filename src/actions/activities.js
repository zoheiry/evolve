import * as types from '../constants/ActionTypes';
import { get } from 'lodash';

import { showAlert } from './alert';

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

const startSessionSuccess = (id, activeSession) => ({
  type: types.START_SESSION_SUCCESS,
  payload: { id, activeSession },
});

const endSessionSuccess = (id, sessions) => ({
  type: types.END_SESSION_SUCCESS,
  payload: { id, sessions },
});

const requestSuggestedActivity = () => ({
  type: types.REQUEST_SUGGESTED_ACTIVITY
});

const requestSuggestedActivityFail = () => ({
  type: types.REQUEST_SUGGESTED_ACTIVITY_FAIL
});

const requestSuggestedActivitySuccess = (activity) => ({
  type: types.REQUEST_SUGGESTED_ACTIVITY_SUCCESS,
  payload: { activity }
});

export const addActivity = (activity, userId) => (dispatch, getState, api) => {
  dispatch(addActivityRequest());

  return api.addActivity(activity, userId)
    .then((activity) => dispatch(addActivitySuccess(activity)))
    .then(dispatch(getActivities(userId)))
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

export const startSession = (id) => (dispatch, getState, api) => {
  dispatch(updateActivityRequest());

  return api.startSession(id)
    .then((response) => dispatch(startSessionSuccess(id, response.data)))
    .catch((response) => {
      dispatch(updateActivityFail());
      dispatch(showAlert({
        body: get(response, 'response.data'),
        onAction: (() => { window.location.href = '/activities'})
      }))
    });
};

export const endSession = (id) => (dispatch, getState, api) => {
  dispatch(updateActivityRequest());

  return api.endSession(id)
    .then((response) => dispatch(endSessionSuccess(id, response.data)))
    .catch(() => dispatch(updateActivityFail()));
};

export const getSuggestedActivity = (userId) => (dispatch, getState, api) => {
  dispatch(requestSuggestedActivity());

  return api.getSuggestedActivity(userId)
    .then(activity => dispatch(requestSuggestedActivitySuccess(activity)))
    .catch(() => dispatch(requestSuggestedActivityFail()));
}

export const skipSuggestedActivity = (userId, activityId) => (dispatch, getState, api) => {
  dispatch(requestSuggestedActivity());

  return api.skipSuggestedActivity(userId, activityId)
    .then(activity => dispatch(requestSuggestedActivitySuccess(activity)))
    .catch(() => dispatch(requestSuggestedActivityFail()));
}
