import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import ActivityDataProvider from '../containers/ActivitiesDataProvider';
import Timer from '../components/Timer';
import PageWrapper from '../components/PageWrapper';

const slideUp = keyframes`
  0% { transform: translateY(45px); }
  100% { transform: translateY(0); }
`;

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
`;

const TimerWrapper = styled('div')`
  display: flex;
  flex-grow: 1;
  margin-top: -120px;
  align-items: center;
  justify-content: center;
`;

const Section = styled('div')`
  box-shadow: 0 1px 4px rgba(0, 0, 0, .2);
  padding: 15px;
`;

const Name = styled('div')`
  font-size: 22px;
  text-align: center;
  animation: ${slideUp} 0.3s linear;
`;

class ActivityTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: props.activity.timer || '00:00'
    }
  }

  render() {
    const { match } = this.props;
    const activityId = match.params.id;
    if (!activityId) {
      return null;
    }

    return (
      <ActivityDataProvider render={({ findActivity }) => {
        const activity = findActivity(activityId);
        if (!activity) {
          return null;
        }

        return (
          <PageWrapper>
            <Wrapper>
              <Section>
                <Name>{activity.name}</Name>
              </Section>
              <TimerWrapper>
                <Timer active={true} />
              </TimerWrapper>
            </Wrapper>
          </PageWrapper>
        );
      }} />
    );
  }
};

ActivityTracker.propTypes = {
  // history props
  match: PropTypes.object,
  activity: PropTypes.object,
};

ActivityTracker.defaultProps = {
  activity: {}
};

export default ActivityTracker;
