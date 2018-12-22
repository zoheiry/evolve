import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { noop } from 'lodash';

import Button from '../Button';

const slideInDown = keyframes`
  0% { opacity: 0; transform: translateY(-100px)}
  100% { opacity: 1; transform: translateY(0)}
`;

const Backdrop = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
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
  width: ${p => p.fluid ? '95%' : '70%'};
  max-width: 600px;
  min-height: 230px;
  padding: 15px;
  ${p => p.theme.defaultShadow};
  animation: ${slideInDown} 0.5s ease;
`;

const AlertBody = styled('div')`
  width: 100%;
  flex-grow: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AlertAction = styled('div')`
  width: 100%;
`;

const StyledButton = styled(Button)`
  background: ${p => (p.appearance === 'danger' ? p.theme.danger : p.theme.primary)}
`;

const Alert = ({ body, buttonText, onAction, onClickOutside, fluid, loading, ctaAppearance }) => (
  <Backdrop onClick={onClickOutside}>
    <AlertWindow fluid={fluid} onClick={(e) => e.stopPropagation()}>
      <AlertBody>{body}</AlertBody>
      <AlertAction>
        <StyledButton fluid onClick={onAction} appearance={ctaAppearance}>
          {buttonText}
        </StyledButton>
      </AlertAction>
    </AlertWindow>
  </Backdrop>
);

Alert.propTypes = {
  body: PropTypes.node,
  buttonText: PropTypes.string,
  onAction: PropTypes.func,
  onClickOutside: PropTypes.func,
  fluid: PropTypes.bool,
  loading: PropTypes.bool,
  ctaAppearance: PropTypes.oneOf(['success', 'danger'])
};

Alert.defaultProps = {
  body: 'Something went wrong',
  buttonText: 'Close',
  onAction: noop,
  onClickOutside: noop,
  fluid: false,
};

export default Alert;
