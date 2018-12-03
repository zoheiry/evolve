import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import priorityColors from '../../constants/PriorityColors';

const Wrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px #ddd;
  padding-bottom: 15px;
  margin-bottom: 15px;
`;

const Name = styled('span')`
  font-weight: bold;
  margin-right: 5px;
  flex-grow: 1;
`;

const Priority = styled('div')`
  background: ${p => priorityColors[p.value]};
  color: #FFF;
  padding: 5px;
  border-radius: 50%;
  font-size: 14px;
  width: 30px;
  height: 30px;
  text-align: center;
  font-weight: bold;
`;

const Activity = ({ name, priority }) => (
  <Wrapper>
    <Name>{name}</Name>
    <div><Priority value={priority}>{priority}</Priority></div>
  </Wrapper>
);

Activity.propTypes = {
  name: PropTypes.string,
  priority: PropTypes.number,
};

export default Activity;
