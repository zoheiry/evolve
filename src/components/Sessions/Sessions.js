import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';

import { getTimePassed, formatTime, humanFriendlyDate } from '../../utils/time';

const Wrapper = styled('div')``;

const Session = styled('div')`
  display: flex;
  align-items: center;
  &:not(:last-child) {
    border-bottom: solid 1px #ddd;
    margin-bottom: 10px;
    padding-bottom: 10px;
  }
`;

const Day = styled('span')`
  font-weight: bold;
  font-size: 13px;
`;

const Duration = styled('span')`
  font-weight: bold;
`;

const SessionTimes = styled('span')`
  margin: 0 10px;
`;

const ViewAllSessions = styled(Link)`
  color: ${p => p.theme.success};
  text-decoration: underline;
`;

const renderSession = (session = {}) => {
  const startDate = moment(session.start);
  const endDate = moment(session.end);
  const duration = formatTime(getTimePassed(startDate, endDate), { hideSeconds: true });
  const TIME_FORMAT = 'hh:mm A';
  const startTime = startDate.format(TIME_FORMAT);
  const endTime = endDate.format(TIME_FORMAT);

  return (
    <Session key={session.start}>
      <Day>{humanFriendlyDate(startDate)}</Day>
      <SessionTimes>{startTime} - {endTime}</SessionTimes>
      [<Duration>{duration}</Duration>]
    </Session>
  );
}

const Sessions = ({ sessionsList, limit, activityId }) => {
  if (isEmpty(sessionsList)) {
    return null;
  }
  const sortedList = [...sessionsList].sort((s1, s2) => moment(s2.start).diff(moment(s1.start)));
  const list = limit ? sortedList.slice(0, limit) : sortedList;
  window.moment = moment;
  return (
    <Wrapper>
      {list.map(renderSession)}
      {limit && sessionsList.length > limit && activityId && (
        <ViewAllSessions to={`/activity/${activityId}/sessions`}>
          View all sessions
        </ViewAllSessions>
      )}
    </Wrapper>
  );
}

Sessions.propTypes = {
  sessionsList: PropTypes.array,
  limit: PropTypes.number,
  activityId: PropTypes.string,
};

Sessions.defaultProps = {
  sessionsList: [],
};

export default Sessions;
