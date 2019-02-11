import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { upperFirst } from 'lodash';

import { getNextTimeSlot } from '../../utils/schedule';
import alarmImg from '../../static/img/alarm.svg'

const Wrapper = styled('div')`  
  ${p => p.theme.defaultShadow};
  padding: 15px;
  background: #182c3e;
  color: #fff;
  text-align: center;
`;

const ImageWrapper = styled('div')`
  width: 100%;
  padding: 15px;
`;

const Title = styled('h3')`
  margin: 0;
  font-weight: 400;
  font-size: 16px;
`;

const Day = styled('div')`
  font-size: 20px;
  font-weight: 300;
`;

const TimeSlot = styled('div')`
  color: #a092ed;
  font-size: 20px;
  letter-spacing: 1px;
  padding: 5px 0 15px 0;
`;

const UpcomingTimeSlot = ({ user }) => {
  if (!user || !user.schedule) {
    return null;
  }

  const timeSlot = getNextTimeSlot(user.schedule);
  if (!timeSlot) {
    return null;
  }
  const { startTime, endTime, day } = timeSlot;
  return (
    <Wrapper>
      <Title>
        <ImageWrapper>
          <img src={alarmImg} alt="alarm" />
        </ImageWrapper>
        <Day>
          <div>{upperFirst(day)}'s session</div>
        </Day>
        <TimeSlot>
          {startTime} to {endTime}
        </TimeSlot>
      </Title>
    </Wrapper>
  );
}

UpcomingTimeSlot.propTypes = {
  user: PropTypes.object,
};

export default UpcomingTimeSlot;
