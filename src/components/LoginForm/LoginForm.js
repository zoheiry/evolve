import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { get, noop, isEmpty } from 'lodash';
import { FiLock, FiMail } from 'react-icons/fi';

import Button from '../Button';

const Wrapper = styled('div')`
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

class LoginForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: props.error,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.error !== state.error) {
      return {
        error: props.error
      };
    }
    return null
  }

  handleSubmit = () => {
    const { email, password } = this.state;
    this.props.onSubmit(email, password);
  }

  handleChange = (field, value) => {
    if (this.state[field] !== value) {
      this.setState({ [field]: value });
    }
  }

  render() {
    const { error } = this.state;
    return (
      <Wrapper onKeyDown={(e) => { e.keyCode === 13 && this.handleSubmit(); }}>
        {!isEmpty(error) && <ErrorMessage>{error.message}</ErrorMessage>}
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
      </Wrapper>
    );
  }
}

LoginForm.propTypes = {
  error: PropTypes.shape({ message: PropTypes.string }),
  onSubmit: PropTypes.func,
};

LoginForm.defaultProps = {
  error: {},
  onSubmit: noop,
}

export default LoginForm;
