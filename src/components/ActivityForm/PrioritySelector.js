import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import colors from '../../constants/PriorityColors';

const PRIORITIES = [1, 2, 3, 4, 5];

const Wrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Priority = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  padding: 15px;
  border-radius: 50%;
  color: ${p => (p.selected ? '#FFF' : p.color)};
  background: ${p => (p.selected ? p.color : '#FFF')};
  border: solid 1px ${p => (p.selected ? 'transparent' : p.color)};
  width: 30px;
  height: 30px;
  transition: 0.3s linear;
`;

const PrioritySelector = ({ selectedPriority, onSelect }) => (
  <Wrapper>
    {PRIORITIES.map(priority =>
      <div key={`priority-${priority}-selector`}>
        <Priority
          color={colors[priority]}
          selected={selectedPriority === priority}
          onClick={() => onSelect(priority)}
        >
          {priority}
        </Priority>
      </div>
    )}
  </Wrapper>
);

PrioritySelector.propTypes = {
  selectedPriority: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
};

export default PrioritySelector;
