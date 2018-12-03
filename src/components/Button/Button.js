import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const disabledStyles = css`
  opacity: 0.5;
  pointer-events: none;
`;

const StyledButton = styled('button')`
  border: none;
  ${p => p.fluid && 'width: 100%;'}
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  background: ${p => p.theme.primary};
  color: #FFF;
  ${p => p.disabled && disabledStyles}
`;

const Button = ({ children, fluid, ...props }) =>
  <StyledButton
    {...props}
    fluid={fluid}
  >
    {children}
  </StyledButton>;

Button.propTypes = {
  children: PropTypes.node,
  fluid: PropTypes.bool,
}

export default Button;
