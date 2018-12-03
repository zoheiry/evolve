import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserDataProvider from '../containers/UserDataProvider';
import ActivitiesDataProvider from '../containers/ActivitiesDataProvider';
import OverlayLoading from '../components/OverlayLoading';

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
            render={({ activities }) => {
              if (user.isFetching || activities.isFetching) {
                return <OverlayLoading />;
              }
              if (user.schedule) {
                return <Redirect to="/activities" />
              }
              return <Redirect to="/schedule" />
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
