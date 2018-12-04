import React from 'react';
import PropTypes from 'prop-types';

import PageWrapper from '../components/PageWrapper';
import UserDataProvider from '../containers/UserDataProvider';
import ActivitiesDataProvider from '../containers/ActivitiesDataProvider';
import ActivityForm from '../components/ActivityForm';


const NewActivity = ({ history }) => (
  <PageWrapper>
    <UserDataProvider
      render={({ user }) =>
        <ActivitiesDataProvider
          render={({ addActivity }) =>
            <ActivityForm
              onSubmit={(activity) => {
                addActivity(activity, user.id);
                history.push('/');
              }}
            />
          }
        />
      }
    />
  </PageWrapper>
);

NewActivity.propTypes = {
  history: PropTypes.object,
};

export default NewActivity;
