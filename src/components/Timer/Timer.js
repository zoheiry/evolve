import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

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
  border: solid 2px ${p => p.theme.danger};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: ${p => p.theme.danger};
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
      seconds: startTime.minutes || 0,
      active: props.active
    };
  }

  timerInterval = null;

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

  startTimer = () => {
    this.timerInterval = setInterval(this.incrementSeconds, 1000);
    this.setState({ active: true });
  }

  stopTimer = () => {
    clearInterval(this.timerInterval);
    this.setState({ active: false });
    
  }

  toggleTimer = () =>
    this.state.active ? this.stopTimer() : this.startTimer();

  componentDidMount() {
    if (this.state.active) {
      this.startTimer();
    }
  }

  render() {
    const { theme } = this.props;
    return (
      <Wrapper>
        <StyledTimer>{formatTime(this.state)}</StyledTimer>
        <ButtonsWrapper>
          <Button
            onClick={this.toggleTimer}
            color={theme.danger}
          >
            End session
          </Button>
          <Button
            onClick={this.toggleTimer}
            color={this.state.active ? theme.danger : theme.primary}
            secondary
          >
            {this.state.active ? 'Pause' : 'Play'}
          </Button>
        </ButtonsWrapper>
      </Wrapper>
    );
  }
}

Timer.propTypes = {
  startTime: PropTypes.shape({
    hours: PropTypes.Number,
    minute: PropTypes.Number,
    seconds: PropTypes.Number
  }),
  active: PropTypes.bool,
  theme: PropTypes.object,
};

Timer.defaultProps = {
  startTime: {
    hours: 0,
    minutes: 0,
    seconds: 0
  },
  active: false,
};

export default withTheme(Timer);
