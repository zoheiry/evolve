import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import priorityColors from '../../constants/PriorityColors';

const Priority = styled('div')`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${p => p.color};
  box-shadow: 0 0 4px ${p => p.color};
`;

const PriorityIndicator = ({ priority }) => (
  <Priority color={priorityColors[priority]} />
);

PriorityIndicator.propTypes = {
  priority: PropTypes.number
};

PriorityIndicator.defaultProps = {
  priority: 0
};

export default PriorityIndicator;
