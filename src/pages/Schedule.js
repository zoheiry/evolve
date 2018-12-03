import React from 'react';
import UserDataProvider from '../containers/UserDataProvider';
import ScheduleForm from '../components/ScheduleForm';

const Schedule = () => (
  <UserDataProvider
    render={({ user, updateSchedule }) =>
      <ScheduleForm schedule={user.schedule} onSubmit={updateSchedule} />
    }
  />
);

export default Schedule;
