import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PageWrapper from '../components/PageWrapper';
import UserDataProvider from '../containers/UserDataProvider';
import ActivitiesDataProvider from '../containers/ActivitiesDataProvider';
import ActivityForm from '../components/ActivityForm';


const NewActivity = ({ history, match, activity }) => {
  if (match.params.id && !activity) {
    return null;
  }

  return (
    <PageWrapper>
      <UserDataProvider
        render={({ user }) =>
          <ActivitiesDataProvider
            render={({ addActivity }) =>
              <ActivityForm
                activity={activity}
                onSubmit={(activity) => { addActivity(activity, user.id); history.push('/'); }}
              />
            }
          />
        }
      />
    </PageWrapper>
  );
}

NewActivity.propTypes = {
  history: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  if (id) {
    return {
      activity: state.activities.items.find(a => a.id === id)
    }
  }
};

export default connect(mapStateToProps)(NewActivity);
