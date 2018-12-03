import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { get } from 'lodash';

import OverlayLoading from '../OverlayLoading';
import ActivityPreview from './ActivityPreview';
import AddActivityButton from './AddActivityButton';

const Wrapper = styled('div')`
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

const Activities = styled('div')`
  overflow: auto;
`;

const ActivitiesOverview = ({ activities }) => {
  if (activities.isFetching) {
    return <OverlayLoading />;
  }
  return (
    <Wrapper>
      <Activities>
        {get(activities, 'items', []).map(activity =>
          <ActivityPreview
            key={activity.id}
            id={activity.id}
            name={activity.name}
            priority={activity.priority}
          />
        )}
      </Activities>
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
