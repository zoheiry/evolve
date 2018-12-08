import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import linkify from 'linkifyjs/html';
import { Link } from 'react-router-dom';

import ActivitiesDataProvider from '../containers/ActivitiesDataProvider';
import PageWrapper from '../components/PageWrapper';
import Button from '../components/Button';
import PriorityIndicator from '../components/PriorityIndicator';

const Wrapper = styled('div')`
`;

const Section = styled('div')`
  padding: 15px;
  margin: 15px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .2);
`;

const Name = styled('div')`
  font-size: 22px;
  padding: 15px;
  margin-bottom: 15px;
  text-align: center;
  background: #f5f5f5;
  text-decoration: none;
`;

const Label = styled('div')`
  font-weight: bold;
  display: ${p => (p.inline ? 'inline-block' : 'block')};
  margin-${p => (p.inline ? 'right' : 'bottom')}: 5px;
`;

const TimeSpent = styled('div')`
  display: flex;
  align-items: center;
  line-height: 1;
`;

const ButtonWrapper = styled('div')`
  padding: 15px;
  > *:not(:first-child) {
    margin-top: 15px;
  }
`;

const Properties = styled('div')``;

const PriorityWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Notes = styled('div')`
  a {
    color: #219fec;
  }
`;

const ActionsBar = styled('div')`
  padding: 15px;
  text-align: right;

  a {
    color: ${p => p.theme.success};
  }
`;

const Activity = ({ match, theme, history }) => {
  const activityId = match.params.id
  if (!activityId) {
    return null;
  }

  return (
    <ActivitiesDataProvider render={({ findActivity, getTimeSpent, startSession }) => {
      const activity = findActivity(activityId);
      const { activeSession, priority } = activity;
      const timeSpent = getTimeSpent(activity);
      const hasActiveSession = activeSession && activeSession.start;

      return (
        <PageWrapper>
          <Wrapper>
            <ActionsBar>
              <Link to={`/activity/${activity.id}/edit`}>Edit</Link>
            </ActionsBar>
            <Properties>
              <Name>{activity.name}</Name>
              <Section>
                <PriorityWrapper>
                  <div>
                    <Label inline>Priority:</Label>
                    <span>{priority}</span>
                  </div>
                  <div>
                    <PriorityIndicator priority={priority} />
                  </div>
                </PriorityWrapper>
              </Section>
              <Section>
                <TimeSpent>
                  <Label inline>Time spent:</Label>
                  <span>{timeSpent}</span>
                </TimeSpent>
              </Section>
              {activity.notes && (
                <Section>
                  <Label>Notes:</Label>
                  <Notes dangerouslySetInnerHTML={{__html: linkify(activity.notes)}} />
                </Section>
              )}
            </Properties>
            <ButtonWrapper>
              {hasActiveSession
                ? (
                  <Button
                    fluid
                    color={theme.danger}
                    onClick={() => { history.push(`/activity/${activityId}/track`); }}
                  >
                    View active session
                  </Button>
                ) : (
                  <Button
                    fluid
                    color={theme.success}
                    onClick={() => {
                      startSession(activityId);
                      history.push(`/activity/${activityId}/track`);
                    }}
                  >
                    Start session
                  </Button>
                )
              }
              {/* <Button secondary fluid color={theme.success}>Add time spent</Button> */}
            </ButtonWrapper>
          </Wrapper>
        </PageWrapper>
      );
    }} />
  );
}

Activity.propTypes = {
  // route property
  match: PropTypes.object,
  theme: PropTypes.object,
}

export default withTheme(Activity);
