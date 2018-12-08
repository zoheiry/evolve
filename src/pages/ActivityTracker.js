import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, withTheme } from 'styled-components';
import { Link } from 'react-router-dom';

import ActivitiesDataProvider from '../containers/ActivitiesDataProvider';
import Timer from '../components/Timer';
import PageWrapper from '../components/PageWrapper';
import Button from '../components/Button';

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
  a {
    text-decoration: none;
    color: ${p => p.theme.textColor};
  }
`;

const EmptyState = styled('div')`
  text-align: center;
  font-weight: bold;
`;

const ActivityTracker = ({ match, history, theme }) => {
  const activityId = match.params.id;
  if (!activityId) {
    return null;
  }

  return (
    <ActivitiesDataProvider
      render={({ findActivity, getActiveSessionRunningTime, startSession, endSession }) => {
        const activity = findActivity(activityId);
        if (!activity) {
          return null;
        }
        const activeSession = activity.activeSession || {};
        const hasActiveSession = !!activeSession.start;
        const runningTime = getActiveSessionRunningTime(activeSession);

        return (
          <PageWrapper>
            <Wrapper>
              <Section>
                <Name>
                  <Link to={`/activity/${activityId}`}>{activity.name}</Link>
                </Name>
              </Section>
              <TimerWrapper>
                {hasActiveSession ? (
                  <Timer
                    active={hasActiveSession}
                    startTime={runningTime}
                    onEnd={() => {
                      endSession(activityId);
                      history.push('/activities');
                    }}
                  />
                ) : (
                  <EmptyState>
                    <p>No active sessions</p>
                    <Button color={theme.success} onClick={() => startSession(activityId)}>
                      Start a new session
                    </Button>
                  </EmptyState>
                )}
              </TimerWrapper>
            </Wrapper>
          </PageWrapper>
        );
      }}
    />
  );
}

ActivityTracker.propTypes = {
  // history props
  match: PropTypes.object,
  history: PropTypes.object,
  activity: PropTypes.object,
  theme: PropTypes.object
};

ActivityTracker.defaultProps = {
  activity: {}
};

export default withTheme(ActivityTracker);
