import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import priorityColors from '../../constants/PriorityColors';

const Wrapper = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${p => p.theme.defaultShadow};
  padding: 15px;
  color: #000;
  text-decoration: none;
  margin: 15px 0;
`;

const Priority = styled('div')`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${p => p.color};
  box-shadow: 0 0 4px ${p => p.color};
`;

const Name = styled('span')`
  font-weight: bold;
  margin-right: 5px;
  flex-grow: 1;
  color: #555;
`;

const ActivityPreview = ({ name, priority, id }) => (
  <Wrapper to={`/activity/${id}`}>
    <Name>{name}</Name>
    <Priority color={priorityColors[priority]} />
  </Wrapper>
);

ActivityPreview.propTypes = {
  name: PropTypes.string.isRequired,
  priority: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default ActivityPreview;
