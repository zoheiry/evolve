import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserDataProvider from '../containers/UserDataProvider';
import ScheduleForm from '../components/ScheduleForm';

import { getUser } from '../actions/user';

class Main extends Component {
  componentDidMount() {
    const userId = '5bfdc20b1181f6538acc23e4';
    this.props.getUser(userId);
  }

  render() {
    return (
      <UserDataProvider
        render={({ user }) => {
          // if (!user.schedule) {
            return <ScheduleForm schedule={user.schedule} />;
          // }
        }}
      />
    );
  }
}

Main.propTypes = {
  children: PropTypes.node,
  getUser: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
  getUser: (id) => dispatch(getUser(id))
})

export default connect(null, mapDispatchToProps)(Main);
