import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import PriorityIndicator from '../PriorityIndicator';

const Wrapper = styled(Link)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  ${p => p.theme.defaultShadow};
  padding: 15px;
  text-decoration: none;
  margin: 15px 0;
  background: ${p => (p.active ? '#fcffdc' : '#fff')};
  text-align: left;
`;

const Name = styled('span')`
  font-weight: bold;
  margin-right: 5px;
  flex-grow: 1;
  color: ${p => p.theme.textColor};
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
