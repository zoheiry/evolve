import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import PriorityIndicator from '../PriorityIndicator';

const Wrapper = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${p => p.theme.defaultShadow};
  padding: 15px;
  color: #000;
  text-decoration: none;
  margin: 15px;
  background: ${p => (p.active ? '#fcffdc' : '#fff')};
`;

const Name = styled('span')`
  font-weight: bold;
  margin-right: 5px;
  flex-grow: 1;
  color: #555;
`;

const ActivityPreview = ({ name, priority, id, active }) => (
  <Wrapper to={`/activity/${id}`} active={active ? 1 : 0}>
    <Name>{name}</Name>
    <PriorityIndicator priority={priority} />
  </Wrapper>
);

ActivityPreview.propTypes = {
  name: PropTypes.string.isRequired,
  priority: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  active: PropTypes.bool
};

export default ActivityPreview;
