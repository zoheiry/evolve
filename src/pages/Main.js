// This component is rendered on every page.
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import OverlayLoading from '../components/OverlayLoading';
import { getUser } from '../actions/user';
import { getActivities, getSuggestedActivity } from '../actions/activities';
import { getCookie, deleteCookie } from '../utils/cookies';
import * as userStates from '../constants/OnBoardingStates';

class Main extends PureComponent {
  componentDidMount() {
    const { pathname } = this.props.history.location;
    if (this.validAuthToken()) {
      this.props.getUser();
    } else if (pathname !== '/login' && pathname !== '/signup') {
      this.props.history.push('/login');
    }
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    const userError = get(user, 'error.response.data.name', '');
    const validAuthToken = this.validAuthToken();
    if (
      validAuthToken &&
      (userError === 'TokenExpiredError' || userError === 'JsonWebTokenError')
    ) {
      deleteCookie('auth');
      this.props.history.push('/login');
      return;
    }
    if (user.onBoardingState !== prevProps.user.onBoardingState) {
      this.onChangeOnBoardingState();
    }
    if (user.id && !prevProps.user.id) {
      this.onUserLoad();
    }
  }

  onUserLoad = () => {
    this.props.getActivities();
    this.props.getSuggestedActivity();
  }

  onChangeOnBoardingState = () => {
    const { user, history } = this.props;
    const { onBoardingState } = user;
    const { pathname } = history.location;

    if (onBoardingState === userStates.FRESH && pathname !== '/intro') {
      history.push('/intro');
    } else if (onBoardingState === userStates.SCHEDULE && pathname !== '/schedule') {
      history.push('/schedule');
    } else if (onBoardingState === userStates.ACTIVITIES && pathname !== '/activity') {
      history.push('/activity');
    }
  }

  validAuthToken = () => {
    const authCookie = getCookie('auth');
    return !!authCookie;
  }

  render() {
    const { user, activities } = this.props;

    if (user.isFetching || activities.isFetching) {
      return <OverlayLoading />;
    }
    return null;
  }
}

Main.propTypes = {
  history: PropTypes.object,
  // redux actions
  getUser: PropTypes.func,
  getActivities: PropTypes.func,
  getSuggestedActivity: PropTypes.func,
  // redux state
  user: PropTypes.object,
  activities: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user,
  activities: state.activities,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser()),
  getActivities: () => dispatch(getActivities()),
  getSuggestedActivity: () => dispatch(getSuggestedActivity()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
