import { omit } from 'lodash';

export const fromServer = (data) => ({
  ...omit(data, ['__v', '_id']),
  id: data._id
});

export default fromServer;
