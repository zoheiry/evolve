import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getUser, updateSchedule, changeOnBoardingState } from '../actions/user';

const UserDataProvider = ({ render, user, updateSchedule, changeOnBoardingState }) => (
  render({
    user,
    getUser,
    changeOnBoardingState,
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
  changeOnBoardingState: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser()),
  updateSchedule: (weekDays) => dispatch(updateSchedule(weekDays)),
  changeOnBoardingState: (state) => dispatch(changeOnBoardingState(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDataProvider);
