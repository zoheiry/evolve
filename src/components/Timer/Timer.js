import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { noop } from 'lodash';

import { formatTime } from '../../utils/time';
import Button from '../Button';

import '../../static/fonts/fonts.css';

const Wrapper = styled('div')`
  width: 100%;
`;

const StyledTimer = styled('div')`
  width: 200px;
  height: 200px;
  margin: 0 auto;
  font-family: 'digital', 'Lato';
  font-size: 40px;
  text-align: center;
  border: solid 2px ${p => (p.active ? p.theme.danger : p.theme.success)};
  color: ${p => (p.active ? p.theme.danger : p.theme.success)};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;

const ButtonsWrapper = styled('div')`
  padding-top: 30px;
  display: flex;
  width: 100%;
  justify-content: space-around;
  justify-content: space-evenly;
  > button {
    min-width: 150px;
    outline: none;
  }
`;

class Timer extends Component {
  constructor(props) {
    super(props);
    const { startTime } = props;
    this.state = {
      hours: startTime.hours || 0,
      minutes: startTime.minutes || 0,
      seconds: startTime.seconds || 0,
      active: props.active
    };
  }

  timerInterval = null;

  componentDidMount() {
    if (this.state.active) {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  incrementSeconds = () => {
    const { hours, minutes, seconds } = this.state;
    let newSeconds = seconds;
    let newMinutes = minutes;
    let newHours = hours;

    newSeconds++;
    if (newSeconds > 59) {
      newSeconds = 0;
      newMinutes++;
    }
    if (newMinutes > 59) {
      newMinutes = 0;
      newHours++;
    }
    this.setState({
      hours: newHours,
      minutes: newMinutes,
      seconds: newSeconds
    })
  }

  resetTime = () => {
    this.setState({ hours: 0, minutes: 0, seconds: 0 });
  }

  startTimer = () => {
    this.timerInterval = setInterval(this.incrementSeconds, 1000);
    this.setState({ active: true });
    this.props.onStart();
  }

  endTimer = () => {
    clearInterval(this.timerInterval);
    this.setState({ active: false });
    this.props.onEnd();
    this.resetTime();
  }

  render() {
    const { theme } = this.props;
    const { active } = this.state;
    return (
      <Wrapper>
        <StyledTimer active={active}>{formatTime(this.state)}</StyledTimer>
        <ButtonsWrapper>
          {active
            ? <Button onClick={this.endTimer} color={theme.danger}>End session</Button>
            : <Button onClick={this.startTimer} color={theme.success}>Start session</Button>
          }
        </ButtonsWrapper>
      </Wrapper>
    );
  }
}

Timer.propTypes = {
  startTime: PropTypes.shape({
    hours: PropTypes.number,
    minute: PropTypes.number,
    seconds: PropTypes.number
  }),
  active: PropTypes.bool,
  onStart: PropTypes.func,
  onEnd: PropTypes.func,
  theme: PropTypes.object,
};

Timer.defaultProps = {
  startTime: {
    hours: 0,
    minutes: 0,
    seconds: 0
  },
  active: false,
  onStart: noop,
  onEnd: noop,
};

export default withTheme(Timer);
