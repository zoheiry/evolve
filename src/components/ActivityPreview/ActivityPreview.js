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
  color: ${p => p.theme.textColor};
  padding: 15px;
  text-decoration: none;
  margin: 15px 0;
  background: ${p => (p.active ? '#fcffdc' : '#fff')};
  text-align: left;
  &:first-child {
    margin-top: 0;
  }
`;

const Name = styled('div')`
  font-weight: bold;
  margin-right: 5px;
  flex-grow: 1;
  color: ${p => p.theme.textColor};
`;

const TimeSpent = styled('div')`
  font-size: 87.5%;
  margin-right: 15px;
`

const ActivityPreview = ({ name, priority, id, active, timeSpent }) => (
  <Wrapper to={`/activity/${id}`} active={active ? 1 : 0}>
    <Name>{name}</Name>
    {timeSpent && <TimeSpent>{timeSpent}</TimeSpent>}
    <PriorityIndicator priority={priority} />
  </Wrapper>
);

ActivityPreview.propTypes = {
  name: PropTypes.string.isRequired,
  priority: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  active: PropTypes.bool,
  timeSpent: PropTypes.string,
};

export default ActivityPreview;
