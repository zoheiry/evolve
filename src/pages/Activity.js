import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PageWrapper from '../components/PageWrapper';
import priorityColors from '../constants/PriorityColors';

const Wrapper = styled('div')`
  padding: 15px;
  padding-left: 10px;
  border-left: solid 5px ${p => p.borderColor};
`;

const Activity = ({ activity }) => {
  if (!activity) {
    return null;
  }
  return (
    <PageWrapper>
      <Wrapper borderColor={priorityColors[activity.priority]}>
        {Object.keys(activity).map(key =>
          <div><strong>{key}:</strong> {activity[key]}</div>
        )}
      </Wrapper>
    </PageWrapper>
  );
}

Activity.propTypes = {
  // route property
  match: PropTypes.object,
  // redux state
  activity: PropTypes.object,
}

const mapStateToProps = (state, ownProps) => ({
  activity: state.activities.items.find(a => a.id === ownProps.match.params.id)
});

export default connect(mapStateToProps)(Activity);
