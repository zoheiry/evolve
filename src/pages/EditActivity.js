import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import PageWrapper from '../components/PageWrapper';
import ActivitiesDataProvider from '../containers/ActivitiesDataProvider';
import ActivityForm from '../components/ActivityForm';


const EditActivity = ({ history, match }) => {
  const activityId = match.params.id;
  if (!activityId) {
    return null;
  }

  return (
    <PageWrapper>
      <ActivitiesDataProvider
        render={({ updateActivity, findActivity, deleteActivity }) => {
          const activity = findActivity(activityId);
          if (isEmpty(activity)) {
            return null;
          }
          return (
            <ActivityForm
              activity={activity}
              onDelete={() => {
                deleteActivity(activityId);
                history.push('/activities');
              }}
              onSubmit={(activityData) => {
                updateActivity({ ...activityData, id: activityId });
                history.push(`/activity/${activityId}`);
              }}
            />
          );
        }}
      />
    </PageWrapper>
  );
}

EditActivity.propTypes = {
  history: PropTypes.object,
};

export default EditActivity;
