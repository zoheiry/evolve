import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import priorityColors from '../../constants/PriorityColors';

const Wrapper = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px #ddd;
  padding-bottom: 15px;
  margin-bottom: 15px;
  color: #000;
  text-decoration: none;
`;

const Name = styled('span')`
  font-weight: bold;
  margin-right: 5px;
  flex-grow: 1;
`;

const Priority = styled('div')`
  border: solid 1px ${p => priorityColors[p.value]};
  color: ${p => priorityColors[p.value]};
  padding: 5px;
  border-radius: 50%;
  font-size: 14px;
  width: 30px;
  height: 30px;
  text-align: center;
  font-weight: bold;
`;

const ActivityPreview = ({ name, priority, id }) => (
  <Wrapper to={`/activity/${id}`}>
    <Name>{name}</Name>
    <div><Priority value={priority}>{priority}</Priority></div>
  </Wrapper>
);

ActivityPreview.propTypes = {
  name: PropTypes.string.isRequired,
  priority: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default ActivityPreview;
