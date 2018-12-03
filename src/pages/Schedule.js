import React from 'react';

import PageWrapper from '../components/PageWrapper';
import UserDataProvider from '../containers/UserDataProvider';
import ScheduleForm from '../components/ScheduleForm';

const Schedule = () => (
  <PageWrapper>
    <UserDataProvider
      render={({ user, updateSchedule }) =>
        <ScheduleForm schedule={user.schedule} onSubmit={updateSchedule} />
      }
    />
  </PageWrapper>
);

export default Schedule;
