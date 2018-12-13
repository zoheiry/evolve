// This component is rendered on every page.
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes, { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import OverlayLoading from '../components/OverlayLoading';
import { getUser } from '../actions/user';
import { getActivities } from '../actions/activities';

class Main extends PureComponent {
  componentDidMount() {
    if (this.validAuthToken()) {
      this.props.getUser();
      this.props.getActivities();
    } else {
      this.props.history.push('/login');
    }
  }

  validAuthToken = () => {
    const { cookies } = this.props;
    console.log('validating auth cookie');
    const authCookie = cookies.get('auth');
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
  cookies: instanceOf(Cookies),
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
  getUser: () => dispatch(getUser()),
  getActivities: () => dispatch(getActivities()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(Main));
