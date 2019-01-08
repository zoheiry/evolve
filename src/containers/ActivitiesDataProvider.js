import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTimePassed } from '../utils/time';

import {
  addActivity,
  getActivities,
  updateActivity,
  deleteActivity,
  startSession,
  endSession,
  getSuggestedActivity,
  skipSuggestedActivity,
} from '../actions/activities';

const findActivity = (activities = [], id) => (
  activities.find(activity => activity.id === id) || {}
);

const getActiveSessionRunningTime = (activeSession = {}) => {
  return getTimePassed(activeSession.start);
}

const ActivitiesDataProvider = (props) => (
  props.render({
    findActivity: (id) => findActivity(props.activities.items, id),
    getActiveSessionRunningTime,
    activities: props.activities,
    addActivity: props.addActivity,
    getActivities: props.getActivities,
    updateActivity: props.updateActivity,
    deleteActivity: props.deleteActivity,
    startSession: props.startSession,
    endSession: props.endSession,
    getSuggestedActivity: props.getSuggestedActivity,
    skipSuggestedActivity: props.skipSuggestedActivity,
  })
);

ActivitiesDataProvider.propTypes = {
  render: PropTypes.func,
  // redux state
  activities: PropTypes.object,
  // redux actions
  addActivity: PropTypes.func,
  getActivities: PropTypes.func,
  updateActivity: PropTypes.func,
  deleteActivity: PropTypes.func,
  startSession: PropTypes.func,
  endSession: PropTypes.func,
  getSuggestedActivity: PropTypes.func,
  skipSuggestedActivity: PropTypes.func,
};

const mapStateToProps = (state) => ({
  activities: state.activities
});

const mapDispatchToProps = (dispatch) => ({
  addActivity: (activity) => dispatch(addActivity(activity)),
  getActivities: () => dispatch(getActivities()),
  updateActivity: (activity) => dispatch(updateActivity(activity)),
  deleteActivity: (id) => dispatch(deleteActivity(id)),
  startSession: (id) => dispatch(startSession(id)),
  endSession: (id) => dispatch(endSession(id)),
  getSuggestedActivity: () => dispatch(getSuggestedActivity()),
  skipSuggestedActivity: (activityId) => dispatch(skipSuggestedActivity(activityId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesDataProvider);
