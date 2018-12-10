import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { get } from 'lodash';

import ActivityPreview from './ActivityPreview';
import AddActivityButton from './AddActivityButton';

const Wrapper = styled('div')`
  padding: 15px 0;
  display: flex;
  flex-direction: column;
`;

const Activities = styled('div')`
  overflow: auto;
  padding: 0 15px;
`;

const ButtonWrapper = styled('div')`
  padding: 0 15px;
`;

const ActivitiesOverview = ({ activities }) => (
  <Wrapper>
    <Activities>
      {get(activities, 'items', []).map(activity =>
        <ActivityPreview
          key={activity.id}
          id={activity.id}
          name={activity.name}
          priority={activity.priority}
          active={!!get(activity, 'activeSession.start')}
        />
      )}
    </Activities>
    <ButtonWrapper>
      <AddActivityButton />
    </ButtonWrapper>
  </Wrapper>
);

ActivitiesOverview.defaultProps = {
  activities: {}
};

ActivitiesOverview.propTypes = {
  activities: PropTypes.object
};

export default ActivitiesOverview;
