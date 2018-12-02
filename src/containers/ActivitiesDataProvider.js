import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addActivity, getActivities } from '../actions/activities';

const ActivitiesDataProvider = ({ render, addActivity, activities, getActivities }) => (
  render({ activities, addActivity, getActivities })
);

ActivitiesDataProvider.propTypes = {
  render: PropTypes.func,
  // redux state
  activities: PropTypes.object,
  // redux actions
  addActivity: PropTypes.func,
  getActivities: PropTypes.func,
};

const mapStateToProps = (state) => ({
  activities: state.activities
});

const mapDispatchToProps = (dispatch) => ({
  addActivity: (activity, userId) => dispatch(addActivity(activity, userId)),
  getActivities: (userId) => dispatch(getActivities(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesDataProvider);
