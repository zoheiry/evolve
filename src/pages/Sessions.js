import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PageWrapper from '../components/PageWrapper';
import ActivitiesDataProvider from '../containers/ActivitiesDataProvider';
import SessionsList from '../components/Sessions';

const Wrapper = styled('div')`
  padding: 15px;
`;

const Sessions = ({ match }) => {
  const activityId = match.params.id
  if (!activityId) {
    return null;
  }
  return (
    <PageWrapper>
      <Wrapper>
        <ActivitiesDataProvider render={({ findActivity }) => {
          const activity = findActivity(activityId);
          return <SessionsList sessionsList={activity.sessions} />
        }} />
      </Wrapper>
    </PageWrapper>
  );
};

Sessions.propTypes = {
  match: PropTypes.object,
};

export default Sessions;
