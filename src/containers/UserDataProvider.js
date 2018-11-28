import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getUser, updateSchedule } from '../actions/user';

const UserDataProvider = ({ render, user }) => (
  render({
    user,
    getUser,
    updateSchedule
  })
);

UserDataProvider.propTypes = {
  render: PropTypes.func.isRequired,
  // redux state
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  getUser: (id) => dispatch(getUser(id)),
  updateSchedule: (weekDays) => dispatch(updateSchedule(weekDays))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDataProvider);
