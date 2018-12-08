import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { getTimePassed, formatTime } from '../utils/time';

import {
  addActivity,
  getActivities,
  updateActivity,
  deleteActivity,
  startSession,
  endSession
} from '../actions/activities';

const findActivity = (activities = [], id) => (
  activities.find(activity => activity.id === id) || {}
);

const getTimeSpent = (activity = {}) => {
  const { sessions = [], activeSession = {} } = activity;
  if (!sessions.length && !activeSession.start) {
    return formatTime({}, { hideSeconds: true });
  }
  let totalHours = 0;
  sessions.forEach(session => {
    const startDate = moment(session.start);
    const endDate = moment(session.end);
    const hours = endDate.diff(startDate, 'hours', true);
    totalHours += hours;
  });
  if (activeSession.start) {
    totalHours += moment(Date.now()).diff(moment(activeSession.start), 'hours', true);
  }
  const hours = Math.floor(totalHours);
  const minutes = Math.floor((totalHours - hours) * 60);
  return formatTime({ hours, minutes }, { hideSeconds: true });
}

const getActiveSessionRunningTime = (activeSession = {}) => {
  return getTimePassed(activeSession.start);
}

const ActivitiesDataProvider = (props) => (
  props.render({
    findActivity: (id) => findActivity(props.activities.items, id),
    getTimeSpent,
    getActiveSessionRunningTime,
    activities: props.activities,
    addActivity: props.addActivity,
    getActivities: props.getActivities,
    updateActivity: props.updateActivity,
    deleteActivity: props.deleteActivity,
    startSession: props.startSession,
    endSession: props.endSession,
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
};

const mapStateToProps = (state) => ({
  activities: state.activities
});

const mapDispatchToProps = (dispatch) => ({
  addActivity: (activity, userId) => dispatch(addActivity(activity, userId)),
  getActivities: (userId) => dispatch(getActivities(userId)),
  updateActivity: (activity) => dispatch(updateActivity(activity)),
  deleteActivity: (id) => dispatch(deleteActivity(id)),
  startSession: (id) => dispatch(startSession(id)),
  endSession: (id) => dispatch(endSession(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesDataProvider);
