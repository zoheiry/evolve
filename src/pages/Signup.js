import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { get } from 'lodash';

import { getCookie } from '../utils/cookies';
import { authenticateUser, createUser } from '../actions/user';
import { SignupForm } from '../components/Registration';
import LogoImage from '../static/img/logo.png';
import BackgroundImage from '../static/img/landscape-background2.png';

const Wrapper = styled('div')`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: url(${BackgroundImage});
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

const Footer = styled('div')`
  color: #FFF;
  font-size: 14px;
  a {
    color: ${p => p.theme.success};
  }
`;

class Signup extends Component {
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

  handleRegisterUser = (userInfo) => {
    this.props.createUser(userInfo).then((response) => {
      if (!(response instanceof Error)) {
        this.props.authenticateUser(userInfo);
      }
    });
  }

  render() {
    const { user } = this.props;
    return (
      <Wrapper>
        <Content>
          <Logo><img src={LogoImage} alt="logo" /></Logo>
          <SignupForm
            onSubmit={this.handleRegisterUser}
            error={get(user, 'registrationError.response.data')}
          />
          <Footer>
            Already have an account? <Link to='/login'>Log in here</Link>
          </Footer>
        </Content>
      </Wrapper>
    );
  }
}

Signup.propTypes = {
  authenticateUser: PropTypes.func,
  createUser: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  createUser: (userInfo) => dispatch(createUser(userInfo)),
  authenticateUser: (userInfo) => dispatch(authenticateUser(userInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
