import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled('button')`
  border: none;
  ${p => p.fluid && 'width: 100%;'}
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  background: #0cb67e;
  color: #FFF;
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
