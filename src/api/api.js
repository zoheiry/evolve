import axios from 'axios';

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

export const getUser = (id) => get(`/api/user/users/${id}`);

export const updateSchedule = (schedule, userId) => post(`/api/user/${userId}/schedule`, schedule);
