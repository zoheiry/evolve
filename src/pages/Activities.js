import React from 'react';

import PageWrapper from '../components/PageWrapper';
import ActivitiesOverview from '../components/ActivitiesOverview';
import ActivitiesDataProvider from '../containers/ActivitiesDataProvider';

const Activities = () => (
  <PageWrapper>
    <ActivitiesDataProvider
      render={({ activities }) =>
        <ActivitiesOverview activities={activities} />
      }
    />
  </PageWrapper>
);

export default Activities;
