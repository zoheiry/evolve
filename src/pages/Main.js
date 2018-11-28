import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getUser } from '../actions/user';

class Main extends Component {
  componentDidMount() {
    const userId = '5bfdc20b1181f6538acc23e4';
    this.props.getUser(userId);
  }

  render() {
    return (
      <div>
        <h1>Header</h1>
        {this.props.children}
      </div>
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
