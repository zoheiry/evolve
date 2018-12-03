import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { get } from 'lodash';

import OverlayLoading from '../OverlayLoading';
import Activity from './Activity';
import AddActivityButton from './AddActivityButton';

const Wrapper = styled('div')`
  padding: 15px;
`;

const ActivitiesOverview = ({ activities }) => {
  if (activities.isFetching) {
    return <OverlayLoading />;
  }
  return (
    <Wrapper>
      {get(activities, 'items', []).map(activity =>
        <Activity key={activity.id} name={activity.name} priority={activity.priority} />
      )}
      <AddActivityButton />
    </Wrapper>
  );
};

ActivitiesOverview.defaultProps = {
  activities: {}
};

ActivitiesOverview.propTypes = {
  activities: PropTypes.object
};

export default ActivitiesOverview;
