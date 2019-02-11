import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import { getTotalSessionsDuration } from '../../utils/time';
import timeSpentIcon from '../../static/img/time-spent.svg';

const slideInLeft = keyframes`
  0% { opacity: 0; transform: translateX(100%) }
  100% { opacity: 1; transform: translateX(0) }
`;

const slideOutLeft = keyframes`
  0% { opacity: 1; transform: translateX(0) }
  100% { opacity: 0; transform: translateX(-100%) }
`;

const Wrapper = styled('div')`
  overflow: hidden;
`;

const ActivityWrapper = styled('div')`
  background: #edecf3;
  min-height: 130px;
  display: flex;
  border-radius: 8px;
  padding-left: 9px;
  position: relative;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    width: 9px;
    height: 100%;
    background: #ff727f;
    border-radius: 8px;
  }

  ${p => p.state === 'slideIn' && `animation: ${slideInLeft} 1s;`}
  ${p => p.state === 'slideOut' && `animation: ${slideOutLeft} 1s;`}
  animation-fill-mode: forwards;
`;

const ActivityBody = styled('div')`
  padding: 15px;
  text-align: center;
  letter-spacing: 1px;
`;

const Name = styled('div')`
  font-weight: 600;
  font-size: 22px;
  color: ${p => p.theme.textColor};
`;

const TimeSpent = styled('div')`
  font-size: 16px;
  color: #a092ed;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const TimeSpentIcon = styled('img')`
  width: 20px;
  margin-right: 5px;
`;

const SkipButton = styled('a')`
  border: solid 1px #ff727f;
  color: #ff727f;
  text-align: center;
  display: inline-block;
  border-radius: 8px;
  padding: 13px 40px;
  margin-top: 30px;
  &[disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
`;

class SuggestedActivity extends PureComponent {
  state = {
    animationState: null,
    activityId: this.props.activity.id,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.activity.id &&
      nextProps.activity.id !== prevState.activityId &&
      prevState.animationState === 'slideOut'
    ) {
      return {
        animationState: 'slideIn',
        activityId: nextProps.activity.id,
      }
    }
    if (!prevState.activityId && nextProps.activity.id) {
      return {
        activityId: nextProps.activity.id,
      };
    }
  }

  handleSkip = () => {
    this.setState({
      animationState: 'slideOut'
    });
    setTimeout(() => {
      this.props.onSkip();
    }, 500);
  }

  render() {
    const { activity } = this.props;

    if (!activity.id) {
      return null;
    }

    const { name, priority, id, sessions, activeSession } = activity;
    const { animationState } = this.state;
    const timeSpent = getTotalSessionsDuration(sessions, activeSession, '00:00');
    return (
      <Wrapper>
        <ActivityWrapper state={animationState}>
          <ActivityBody>
            <Name>{name}</Name>
            <TimeSpent>
              <TimeSpentIcon src={timeSpentIcon} />
              {timeSpent}
            </TimeSpent>
          </ActivityBody>
        </ActivityWrapper>
        <SkipButton onClick={this.handleSkip} disabled={animationState === 'slideOut'}>
          Skip this activity
        </SkipButton>
      </Wrapper>
    );
  }
}

SuggestedActivity.propTypes = {
  activity: PropTypes.object,
  onSkip: PropTypes.func,
};

SuggestedActivity.defaultProps = {
  activity: {},
};

export default SuggestedActivity;
