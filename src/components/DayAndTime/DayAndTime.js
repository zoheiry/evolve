import React, { PureComponent } from 'react';
import styled from 'styled-components';
import moment from 'moment';

const DAY_FORMAT = 'dddd';
const TIME_FORMAT = 'hh:mm A';

const Wrapper = styled('div')`
  padding: 15px;
  margin: 15px;
  text-align: center;
`;

const Day = styled('div')``;

const Time = styled('div')``;

class DayAndTime extends PureComponent {
  state = {
    day: moment(Date.now()).format(DAY_FORMAT),
    time: moment(Date.now()).format(TIME_FORMAT),
  }

  render() {
    const { day, time } = this.state;
    return (
      <Wrapper>
        <Day>{day}</Day>
        <Time>{time}</Time>
      </Wrapper>
    )
  }
}

export default DayAndTime;
