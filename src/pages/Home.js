import React from 'react';
import styled from 'styled-components';

import ActivitiesDataProvider from '../containers/ActivitiesDataProvider';
import PageWrapper from '../components/PageWrapper';
import DayAndTime from '../components/DayAndTime';
import SuggestedActivity from '../components/SuggestedActivity';
import UpcomingTimeSlot from '../components/UpcomingTimeSlot';

const Section = styled('div')`
  padding: 15px;
`;

const Title = styled('h2')`
  margin: 0;
  font-weight: 300;
  border-bottom: solid 1px #ddd;
  padding-bottom: 15px;
`;

const Home = () => (  
  <PageWrapper>
    <div>
      <DayAndTime />
      <Section>
        <UpcomingTimeSlot />
      </Section>
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
  </PageWrapper>
);

export default Home;
