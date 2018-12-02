import * as types from '../constants/ActionTypes';

const addActivityRequest = () => ({
  type: types.ADD_ACTIVITY_REQUEST
});

const requestActivities = () => ({
  type: types.REQUEST_ACTIVITIES
});

const addActivityFail = () => ({
  type: types.ADD_ACTIVITY_FAIL
});

const requestActivitiesFail = () => ({
  type: types.REQUEST_ACTIVITIES_FAIL
});

const addActivitySuccess = (activity) => ({
  type: types.ADD_ACTIVITY_SUCCESS,
  payload: { activity }
});

const requestActivitiesSuccess = (activities) => ({
  type: types.REQUEST_ACTIVITIES_SUCCESS,
  payload: { activities }
})

export const addActivity = (activity, userId) => (dispatch, getState, api) => {
  dispatch(addActivityRequest());

  return api.addActivity(activity, userId)
    .then((activity) => dispatch(addActivitySuccess(activity)))
    .catch(() => dispatch(addActivityFail()));
}

export const getActivities = (userId) => (dispatch, getState, api) => {
  dispatch(requestActivities());

  return api.getUserActivities(userId)
    .then((activities) => dispatch(requestActivitiesSuccess(activities)))
    .catch(() => dispatch(requestActivitiesFail()));
}
