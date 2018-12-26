import React, { PureComponent } from 'react';
import styled from 'styled-components';
import moment from 'moment';

const DAY_FORMAT = 'dddd';
const TIME_FORMAT = 'HH:mm';

const Wrapper = styled('div')`
  padding: 15px;
  text-align: center;
  color: ${p => p.theme.textColor};
  position: relative;
  z-index: auto;
  background: #f5f5f5;
`;

const Day = styled('div')`
  font-size: 40px;
  font-weight: 300;
`;

const Time = styled('div')`
  font-size: 20px;
  font-weight: 600;
`;

class DayAndTime extends PureComponent {
  constructor() {
    super();
    this.state = {
      ...this.getCurrentDate()
    };
  }

  updateDateInterval = null

  componentDidMount() {
    this.updateDateInterval = setInterval(this.updateDate, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.updateDateInterval);
  }

  getCurrentDate = () => ({
    day: moment(Date.now()).format(DAY_FORMAT),
    time: moment(Date.now()).format(TIME_FORMAT),
  });

  updateDate = () => {
    this.setState({ ...this.getCurrentDate() })
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
