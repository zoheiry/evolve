import axios from 'axios';
import { fromServer as userFromServer } from './transformers/user';
import { activityFromServer, activitiesFromServer } from './transformers/activity';

const execute = (method, endpoint, data = {}, config = {}, headers = {}) => {
  const defaultHeaders = {
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: 0,
  };

  return axios({
    method,
    url: endpoint,
    data,
    config,
    headers: { ...defaultHeaders, ...headers },
  });
};

const get = (endpoint, extraHeaders = {}) =>
  execute('get', endpoint, undefined, undefined, extraHeaders);

const post = (endpoint, data, config, extraHeaders) =>
  execute('post', endpoint, data, config, extraHeaders);

const put = (endpoint, data) => execute('put', endpoint, data);

const del = (endpoint) => execute('delete', endpoint);

export const getUser = (id) =>
  get(`/api/user/${id}`).then(response => userFromServer(response.data));

export const updateSchedule = (schedule, userId) =>
  put(`/api/user/${userId}/schedule`, schedule)
    .then(response => userFromServer(response.data.schedule));

export const getUserActivities = (userId) =>
  get(`/api/user/${userId}/activities`)
    .then(response => activitiesFromServer(response.data));

export const addActivity = (activity, userId) =>
  post(`/api/user/${userId}/activity`, activity)
    .then(response => activityFromServer(response.data));

// FIXME: No authentication validation done here
export const updateActivity = (activity, userId) =>
  put(`/api/activity/${activity.id}`, activity)
    .then(response => activityFromServer(response.data));

export const deleteActivity = (id) => del(`/api/activity/${id}`)

export const startSession = (id) =>
  put(`/api/activity/${id}/start_session`)

export const endSession = (id) =>
  put(`/api/activity/${id}/end_session`)

export const getSuggestedActivity = (userId) =>
  get(`/api/user/${userId}/activity/suggested`)
    .then(response => activityFromServer(response.data));

export const skipSuggestedActivity = (userId, activityId) =>
  put(`/api/user/${userId}/activity/skip_suggested`, { activityId })
    .then(response => activityFromServer(response.data));
