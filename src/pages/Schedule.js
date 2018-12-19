import React from 'react';

import PageWrapper from '../components/PageWrapper';
import UserDataProvider from '../containers/UserDataProvider';
import ScheduleForm from '../components/ScheduleForm';
import * as userStates from '../constants/OnBoardingStates';

const Schedule = () => (
  <PageWrapper>
    <UserDataProvider
      render={({ user, updateSchedule, changeOnBoardingState }) =>
        <ScheduleForm
          schedule={user.schedule}
          onSubmit={(schedule) => {
            updateSchedule(schedule);
            user.onBoardingState === userStates.SCHEDULE && (
              changeOnBoardingState(userStates.ACTIVITIES)
            );
          }}
        />
      }
    />
  </PageWrapper>
);

export default Schedule;
