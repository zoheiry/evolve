import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { get } from 'lodash';

import { getCookie } from '../utils/cookies';
import { authenticateUser } from '../actions/user';
import { LoginForm } from '../components/Registration';
import FullPageBackground from '../components/FullPageBackground';
import LogoImage from '../static/img/logo.png';
// https://plus.google.com/photos/111985781406492494794/album/6545947008543923265/6545947010461453010?authkey=COr1z-HVjvGEywE&sqid=116500531468128483044&ssid=fe1c3ad1-bebe-41c9-8a11-8451cb521c7d
// https://www.pinterest.com/pin/445997169344481224/

const Logo = styled('div')`
  img {
    width: 100px;
  }
`;

const Footer = styled('div')`
  color: #FFF;
  font-size: 14px;
  a {
    color: ${p => p.theme.success};
  }
`;

class Login extends Component {
  componentDidMount() {
    if (getCookie('auth')) {
      this.props.history.push('/');
    }
  }

  componentDidUpdate() {
    if (this.props.user.id) {
      this.props.history.push('/');
    }
  }

  render() {
    const { authenticateUser, user } = this.props;
    return (
      <FullPageBackground imageNumber={3}>
        <Logo><img src={LogoImage} alt="logo" /></Logo>
        <LoginForm
          onSubmit={authenticateUser}
          error={get(user, 'authenticationError.response.data')}
        />
        <Footer>
          Don't have an account? <Link to='/signup'>Register here</Link>
        </Footer>
      </FullPageBackground>
    );
  }
}

Login.propTypes = {
  authenticateUser: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  authenticateUser: (userInfo) => dispatch(authenticateUser(userInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
