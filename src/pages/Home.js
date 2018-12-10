import React from 'react';
import styled from 'styled-components';

import PageWrapper from '../components/PageWrapper';
import DayAndTime from '../components/DayAndTime';
import ActivitySuggestion from '../components/ActivitySuggestion';

const Wrapper = styled('div')``;

const Home = () => (  
  <PageWrapper>
    <Wrapper>
      <DayAndTime />
      <ActivitySuggestion />
    </Wrapper>
  </PageWrapper>
);

export default Home;
