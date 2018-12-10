import React from 'react';
import UserDataProvider from '../containers/UserDataProvider';
import ActivitiesDataProvider from '../containers/ActivitiesDataProvider';
import PageWrapper from '../components/PageWrapper';
import DayAndTime from '../components/DayAndTime';

const Home = () => (  
  <UserDataProvider
    render={({ user, updateSchedule }) => (
      <ActivitiesDataProvider
        render={({ activities }) => (
          <PageWrapper>
            <DayAndTime />
          </PageWrapper>
        )}
      />
    )}
  />
);

export default Home;
