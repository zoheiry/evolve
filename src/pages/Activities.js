import React from 'react';

import ActivitiesDataProvider from '../containers/ActivitiesDataProvider';
import ActivitiesOverview from '../components/ActivitiesOverview';

const Activities = () => (
  <ActivitiesDataProvider
    render={({ activities }) =>
      <ActivitiesOverview activities={activities} />
    }
  />
);

export default Activities;
