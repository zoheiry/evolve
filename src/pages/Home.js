import React from 'react';
import { Redirect } from 'react-router-dom';
import UserDataProvider from '../containers/UserDataProvider';
import ActivitiesDataProvider from '../containers/ActivitiesDataProvider';
import OverlayLoading from '../components/OverlayLoading';

const Home = () => (  
  <UserDataProvider
    render={({ user, updateSchedule }) => (
      <ActivitiesDataProvider
        render={({ activities }) => {
          if (!user.id || user.isFetching || activities.isFetching) {
            return <OverlayLoading />;
          }
          if (user.schedule) {
            return <Redirect to="/activities" />
          }
          return <Redirect to="/schedule" />
        }}
      />
    )}
  />
);

export default Home;
