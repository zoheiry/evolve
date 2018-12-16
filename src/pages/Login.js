import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get } from 'lodash';

import { getCookie } from '../utils/cookies';
import { authenticateUser } from '../actions/user';
import LoginForm from '../components/LoginForm';
import LogoImage from '../static/img/logo.png';

const Wrapper = styled('div')`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: url(https://wallup.net/wp-content/uploads/2016/03/09/328380-abstract-landscape-artwork-mountain.jpg);
  background-size: cover;
  justify-content: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .5);
  }
`;

const Content = styled('div')`
  position: relative;
  text-align: center;
`;

const Logo = styled('div')`
  img {
    width: 100px;
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
      <Wrapper>
        <Content>
          <Logo><img src={LogoImage} alt="logo" /></Logo>
          <LoginForm
            onSubmit={authenticateUser}
            error={get(user, 'authenticationError.response.data')}
          />
        </Content>
      </Wrapper>
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
  authenticateUser: (email, password) => dispatch(authenticateUser(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
