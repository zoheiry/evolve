import React, { Component } from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FiLock, FiMail } from 'react-icons/fi';

import { authenticateUser } from '../actions/user';
import Button from '../components/Button';
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

const LoginForm = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 30px;
  font-size: 16px;
`;

const InputWrapper = styled('div')`
  border-bottom: solid 1px #FFF;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
`;

const Icon = styled('div')`
  margin-right: 15px;
`;

const Input = styled('input')`
  background-color: transparent;
  display: block;
  width: 100%;
  color: #FFF;
  padding: 8px;
  border: none;
  outline: none;
  font-size: inherit;
  &::placeholder {
    color: rgba(255, 255, 255, 0.8);
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
    -webkit-transition-delay: 9999s;
}
`;

const LoginButton = styled(Button)`
  background-color: rgba(255,255,255,0.4);
  margin-top: 15px;
`;

const ErrorMessage = styled('div')`
  color: #FFF;
  margin-bottom: 15px;
  font-weight: bold
`

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: '',
  };

  componentDidMount() {
    if (this.props.cookies.get('auth')) {
      this.props.history.push('/');
    }
  }

  clearErrors = () => {
    this.setState({ error: '' });
  }

  handleSubmit = () => {
    this.clearErrors();
    const { email, password } = this.state;
    this.props.authenticateUser(email, password).then(() => this.props.history.push('/'));
  }

  handleChange = (field, value) => {
    this.setState({ [field]: value });
  }

  render() {
    return (
      <Wrapper>
        <Content>
          <Logo><img src={LogoImage} alt="logo" /></Logo>
          <LoginForm onKeyDown={(e) => { e.keyCode === 13 && this.handleSubmit(); }}>
            {this.state.error && <ErrorMessage>{this.state.error}</ErrorMessage>}
            <InputWrapper>
              <Icon>
                <FiMail color="#FFF" />
              </Icon>
              <Input
                type="email"
                placeholder="Email"
                onChange={(e) => this.handleChange('email', e.target.value)}
              />
            </InputWrapper>
            <InputWrapper>
              <Icon>
                <FiLock color="#FFF" />
              </Icon>
              <Input
                type="password"
                placeholder="Password"
                onChange={(e) => this.handleChange('password', e.target.value)}
              />
            </InputWrapper>
            <LoginButton onClick={this.handleSubmit}>Log In</LoginButton>
          </LoginForm>
        </Content>
      </Wrapper>
    );
  }
}

Login.propTypes = {
  authenticateUser: PropTypes.func,
  cookies: instanceOf(Cookies),
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  authenticateUser: (email, password) => dispatch(authenticateUser(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(Login));
