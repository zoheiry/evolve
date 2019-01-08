import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { get } from 'lodash';

import { getTotalSessionsDuration } from '../../utils/time';
import ActivityPreview from '../ActivityPreview';

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
  padding: 3px;
`;

const ActivityWrapper = styled('div')`
  ${p => p.state === 'slideIn' && `animation: ${slideInLeft} 1s;`}
  ${p => p.state === 'slideOut' && `animation: ${slideOutLeft} 1s;`}
  animation-fill-mode: forwards;
`;

const SkipButton = styled('a')`
  cursor: pointer;
  display: block;
  text-align: right;
  font-size: 14px;
  text-decoration: underline;
  color: ${p => p.theme.success};
`;

class SuggestedActivity extends PureComponent {
  state = {
    animationState: null,
    activityId: this.props.activity.id,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.activity.id && nextProps.activity.id !== prevState.activityId && prevState.animationState === 'slideOut') {
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
    return (
      <Wrapper>
        <ActivityWrapper state={animationState}>
          <ActivityPreview
            name={name}
            priority={priority}
            id={id}
            active={!!get(activeSession, 'start')}
            timeSpent={getTotalSessionsDuration(sessions, activeSession)}
          />
        </ActivityWrapper>
        <SkipButton onClick={this.handleSkip}>Skip activity (suggest another)</SkipButton>
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
