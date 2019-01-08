import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { isValidTimeString, getTimeDiff } from '../../utils/time';
import UserDataProvider from '../../containers/UserDataProvider';

const Wrapper = styled('div')`  
  ${p => p.theme.defaultShadow};
  padding: 15px;
`;

const Title = styled('h3')`
  color: ${p => p.theme.textColor};
  margin: 0;
  font-weight: 400;
  font-size: 16px;
`;

const UpcomingTimeSlot = () =>
  <UserDataProvider
    render={({ user }) => {
      if (!user || !user.schedule) {
        return null;
      }
      const today = moment().format('dddd').toLowerCase();
      const timeSlotToday = user.schedule[today] || {};
      const { startTime, endTime } = timeSlotToday;
      if (!isValidTimeString(startTime) || !isValidTimeString(endTime)) {
        return <Title>No time slots scheduled for today</Title>;
      }
      const hasTimeSlotPassed = getTimeDiff(startTime, moment().format('HH:mm:ss')) < 0;
      if (hasTimeSlotPassed) {
        return <Title>Today's time slot has already passed.</Title>
      }
      return (
        <Wrapper>
          <Title>
            You have an upcoming session today from
            <strong> {startTime}</strong> to <strong>{endTime}</strong>
          </Title>
        </Wrapper>
      );
    }}
  />

export default UpcomingTimeSlot;
