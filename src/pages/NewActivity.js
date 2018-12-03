import React from 'react';
import PropTypes from 'prop-types';

import UserDataProvider from '../containers/UserDataProvider';
import ActivitiesDataProvider from '../containers/ActivitiesDataProvider';
import ActivityForm from '../components/ActivityForm';


const NewActivity = ({ history }) => (
  <UserDataProvider
    render={({ user }) =>
      <ActivitiesDataProvider
        render={({ addActivity }) =>
          <ActivityForm
            onSubmit={(activity) => { addActivity(activity, user.id); history.push('/'); }}
          />
        }
      />
    }
  />
);

NewActivity.propTypes = {
  history: PropTypes.object,
}

export default NewActivity;
