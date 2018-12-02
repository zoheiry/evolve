import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserDataProvider from '../containers/UserDataProvider';
import ActivitiesDataProvider from '../containers/ActivitiesDataProvider';
import ScheduleForm from '../components/ScheduleForm';
import OverlayLoading from '../components/OverlayLoading';
import ActivityForm from '../components/ActivityForm';

import { getUser } from '../actions/user';
import { getActivities } from '../actions/activities';

class Main extends Component {
  componentDidMount() {
    const userId = '5bfdc20b1181f6538acc23e4';
    this.props.getUser(userId);
    this.props.getActivities(userId);
  }

  render() {
    return (
      <UserDataProvider
        render={({ user, updateSchedule }) => (
          <ActivitiesDataProvider
            render={({ addActivity }) => {
              if (user.isFetching) {
                return <OverlayLoading />;
              }
              if (!user.schedule) {
                return <ScheduleForm schedule={user.schedule} onSubmit={updateSchedule} />;
              }
              return <ActivityForm onSubmit={(activity) => addActivity(activity, user.id)} />;
            }}
          />
        )}
      />
    );
  }
}

Main.propTypes = {
  children: PropTypes.node,
  getUser: PropTypes.func,
  getActivities: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  getUser: (id) => dispatch(getUser(id)),
  getActivities: (userId) => dispatch(getActivities(userId)),
})

export default connect(null, mapDispatchToProps)(Main);
