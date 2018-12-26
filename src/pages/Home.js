import React from 'react';
import styled from 'styled-components';

import PageWrapper from '../components/PageWrapper';
import DayAndTime from '../components/DayAndTime';
import ActivitySuggestion from '../components/ActivitySuggestion';
import UpcomingTimeSlot from '../components/UpcomingTimeSlot';

const Section = styled('div')`
  padding: 15px;
`;

const Home = () => (  
  <PageWrapper>
    <div>
      <DayAndTime />
      <Section>
        <UpcomingTimeSlot />
      </Section>
      <Section>
        <ActivitySuggestion />
      </Section>
    </div>
  </PageWrapper>
);

export default Home;
