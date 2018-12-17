import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getUser, updateSchedule } from '../actions/user';

const UserDataProvider = ({ render, user, updateSchedule }) => (
  render({
    user,
    getUser,
    updateSchedule: (weekDays) => updateSchedule(weekDays)
  })
);

UserDataProvider.propTypes = {
  render: PropTypes.func.isRequired,
  // redux state
  user: PropTypes.object,
  // redux actions
  getUser: PropTypes.func,
  updateSchedule: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser()),
  updateSchedule: (weekDays) => dispatch(updateSchedule(weekDays))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDataProvider);
