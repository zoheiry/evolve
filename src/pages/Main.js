// This component is rendered on every page.
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import OverlayLoading from '../components/OverlayLoading';

import { getUser } from '../actions/user';
import { getActivities } from '../actions/activities';

class Main extends PureComponent {
  componentDidMount() {
    // const userId = '5bfdc20b1181f6538acc23e4';
    const userId = '5c1033c28fed3035ddddb50c';
    this.props.getUser(userId);
    this.props.getActivities(userId);
  }

  componentDidUpdate() {
    const { history, user } = this.props;
    const { pathname } = history.location;
    if (user.onBoardingState === 'schedule' && pathname !== '/schedule') {
      history.push('/schedule');
    }
    if (user.onBoardingState === 'activities' && pathname !== '/activities') {
      history.push('/activities');
    }
  }

  render() {
    const { user, activities, history } = this.props;
    const { pathname } = history.location;

    if (!user.id || user.isFetching || activities.isFetching) {
      return <OverlayLoading />;
    }
    if (user.onBoardingState === 'schedule' && pathname !== '/schedule') {
      return <Redirect to="/schedule" />
    }
    if (user.onBoardingState === 'activities' && pathname !== '/activities') {
      return <Redirect to="/activities" /> 
    }
    return null;
  }
}

Main.propTypes = {
  history: PropTypes.object,
  // redux actions
  getUser: PropTypes.func,
  getActivities: PropTypes.func,
  // redux state
  user: PropTypes.object,
  activities: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user || {},
  activities: state.activities || {},
});

const mapDispatchToProps = (dispatch) => ({
  getUser: (id) => dispatch(getUser(id)),
  getActivities: (userId) => dispatch(getActivities(userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
