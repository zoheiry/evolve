// This component is rendered on every page.
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import OverlayLoading from '../components/OverlayLoading';
import { getUser } from '../actions/user';
import { getActivities } from '../actions/activities';
import { getCookie } from '../utils/cookies';

class Main extends PureComponent {
  componentDidMount() {
    const { pathname } = this.props.history.location;
    if (this.validAuthToken()) {
      this.props.getUser();
      this.props.getActivities();
    } else if (pathname !== '/login' && pathname !== '/signup') {
      this.props.history.push('/login');
    }
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (user.id && !prevProps.user.id) {
      if (user.onBoardingState === 'fresh') {
        this.props.history.push('/intro');   
      }
    }
  }

  validAuthToken = () => {
    console.log('validating auth cookie');
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
