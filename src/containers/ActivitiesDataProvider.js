import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addActivity, getActivities, updateActivity, deleteActivity } from '../actions/activities';

const findActivity = (activities = [], id) => (
  activities.find(activity => activity.id === id)
);

const ActivitiesDataProvider = (props) => (
  props.render({
    activities: props.activities,
    addActivity: props.addActivity,
    getActivities: props.getActivities,
    updateActivity: props.updateActivity,
    deleteActivity: props.deleteActivity,
    findActivity: (id) => findActivity(props.activities.items, id),
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
};

const mapStateToProps = (state) => ({
  activities: state.activities
});

const mapDispatchToProps = (dispatch) => ({
  addActivity: (activity, userId) => dispatch(addActivity(activity, userId)),
  getActivities: (userId) => dispatch(getActivities(userId)),
  updateActivity: (activity) => dispatch(updateActivity(activity)),
  deleteActivity: (id) => dispatch(deleteActivity(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesDataProvider);
