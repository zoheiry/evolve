import React from 'react';
import PropTypes from 'prop-types';

import PageWrapper from '../components/PageWrapper';
import ActivitiesDataProvider from '../containers/ActivitiesDataProvider';
import ActivityForm from '../components/ActivityForm';


const NewActivity = ({ history }) => (
  <PageWrapper>
    <ActivitiesDataProvider
      render={({ addActivity }) =>
        <ActivityForm
          onSubmit={(activity) => {
            addActivity(activity);
            history.push('/');
          }}
        />
      }
    />
  </PageWrapper>
);

NewActivity.propTypes = {
  history: PropTypes.object,
};

export default NewActivity;
