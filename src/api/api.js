import axios from 'axios';
import { fromServer as userFromServer } from './transformers/user';

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

// const put = (endpoint, data) => execute('put', endpoint, data);

// const del = (endpoint) => execute('delete', endpoint);

export const getUser = (id) =>
  get(`/api/user/${id}`).then(response => userFromServer(response.data));

export const updateSchedule = (schedule, userId) =>
  post(`/api/user/${userId}/schedule`, schedule)
    .then(response => userFromServer(response.data.schedule));
