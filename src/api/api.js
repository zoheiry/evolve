import axios from 'axios';
import { get as lodashGet } from 'lodash';
import { fromServer as userFromServer } from './transformers/user';
import { activityFromServer, activitiesFromServer } from './transformers/activity';
import { getCookie, deleteCookie } from '../utils/cookies';

const execute = (method, endpoint, data = {}, config = {}, headers = {}) => {
  const defaultHeaders = {
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: 0,
    'x-access-token': getCookie('auth') || ''
  };

  return axios({
    method,
    url: endpoint,
    data,
    config,
    headers: { ...defaultHeaders, ...headers },
  });
};

export const handleAuthorizationFailure = (error) => {
  const errorName = lodashGet(error, 'response.data.name');
  if (errorName === 'TokenExpiredError' || errorName === 'JsonWebTokenError') {
    deleteCookie('auth');
    window.location.href = '/login'; // triggers a refresh to reset redux state
  }
  return error;
}

const get = (endpoint, extraHeaders = {}) =>
  execute('get', endpoint, undefined, undefined, extraHeaders);

const post = (endpoint, data, config, extraHeaders) =>
  execute('post', endpoint, data, config, extraHeaders);

const put = (endpoint, data) => execute('put', endpoint, data);

const del = (endpoint) => execute('delete', endpoint);

export const getUser = () =>
  get('/api/user/self')
    .then(response => userFromServer(response.data));

export const updateSchedule = (schedule) =>
  put('/api/user/self/schedule', schedule)
    .then(response => userFromServer(response.data.schedule));

export const getActivities = () =>
  get('/api/activities')
    .then(response => activitiesFromServer(response.data));

export const createActivity = (activity) =>
  post('/activity', activity)
    .then(response => activityFromServer(response.data));

export const updateActivity = (activity) =>
  put(`/api/activity/${activity.id}`, activity)
    .then(response => activityFromServer(response.data));

export const deleteActivity = (id) =>
  del(`/api/activity/${id}`)

export const startSession = (id) =>
  put(`/api/activity/${id}/start_session`)

export const endSession = (id) =>
  put(`/api/activity/${id}/end_session`)

export const getSuggestedActivity = () =>
  get('/api/activity/suggested')
    .then(response => activityFromServer(response.data));

export const skipSuggestedActivity = (activityId) =>
  put('/api/activity/skip_suggested', { activityId })
    .then(response => activityFromServer(response.data));

export const authenticateUser = ({ email, password }) =>
  post('/api/user/authenticate', { email, password })
    .then(response => ({ token: response.data.token, user: userFromServer(response.data.user) }));

export const createUser = ({ email, password, passwordConfirmation }) =>
  post('/api/user/create', { email, password, passwordConfirmation })
    .then(response => userFromServer(response.data));

export const changeOnBoardingState = (state) =>
  put('api/user/self/onboarding_state', { state })
    .then(response => userFromServer(response.data));
