import React, { PureComponent } from 'react';
import styled from 'styled-components';
import moment from 'moment';

const DAY_FORMAT = 'dddd';
const TIME_FORMAT = 'hh:mm A';

const Wrapper = styled('div')`
  padding: 15px;
  text-align: center;
  color: ${p => p.theme.textColor};
  position: relative;
  z-index: auto;
  background: #fff;

  &::before {
    width: 100%;
    height: 100%;
    position: absolute;
    content: "";
    box-shadow: 0 1px 4px rgba(0,0,0,.5);
    bottom: 0px;
    left: 0;
    border-radius: 25%;
    z-index: -1;
  }
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
