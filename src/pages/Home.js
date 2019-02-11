import React from 'react';
import styled from 'styled-components';

import ActivitiesDataProvider from '../containers/ActivitiesDataProvider';
import UserDataProvider from '../containers/UserDataProvider';
import PageWrapper from '../components/PageWrapper';
import SuggestedActivity from '../components/SuggestedActivity';
import UpcomingTimeSlot from '../components/UpcomingTimeSlot';

const Section = styled('div')`
  padding: 30px;
  text-align: center;
`;

const Title = styled('h2')`
  color: #6f8498;
  margin: 0;
  text-align: center;
  font-weight: 400;
  font-size: 22px;
  margin-bottom: 15px;
`;

const Home = () => (
  <PageWrapper>
    <UserDataProvider
      render={({ user }) => (
        <div>
          <UpcomingTimeSlot user={user} />
          <Section>
            <ActivitiesDataProvider
              render={({ activities = {}, skipSuggestedActivity }) => {
                if (!activities.suggestedActivity) {
                  return null;
                }
                const { suggestedActivity } = activities;
                return (
                  <div>
                    <Title>Suggested activity</Title>
                    <SuggestedActivity
                      activity={suggestedActivity}
                      onSkip={() => skipSuggestedActivity(suggestedActivity.id)}
                    />
                  </div>
                );
              }}
            />
          </Section>
        </div>
      )}
    />
  </PageWrapper>
);

export default Home;
