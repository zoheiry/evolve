import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { noop } from 'lodash';

import Button from '../Button';

const Backdrop = styled('div')`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, .3);
  z-index: 10;
`;

const AlertWindow = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #FFF;
  width: 70%;
  max-width: 400px;
  min-height: 180px;
  padding: 15px;
  ${p => p.theme.defaultShadow};
`;

const AlertBody = styled('div')`
  flex-grow: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AlertAction = styled('div')`
  width: 100%;
`;

const Alert = ({ bodyText, buttonText, onAction }) => (
  <Backdrop>
    <AlertWindow>
      <AlertBody>{bodyText}</AlertBody>
      <AlertAction>
        <Button fluid onClick={onAction}>
          {buttonText}
        </Button>
      </AlertAction>
    </AlertWindow>
  </Backdrop>
);

Alert.propTypes = {
  bodyText: PropTypes.string,
  buttonText: PropTypes.string,
  onAction: PropTypes.func,
};

Alert.defaultProps = {
  bodyText: 'Something went wrong',
  buttonText: 'Close',
  onAction: noop
};

export default Alert;
