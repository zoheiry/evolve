import { omit } from 'lodash';

export const activitiesFromServer = (data) => (
  data.map(activityFromServer)
);

export const activityFromServer = (data) => ({
  ...omit(data, ['__v', '_id']),
  id: data._id
});
