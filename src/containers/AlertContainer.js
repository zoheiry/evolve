import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { hideAlert } from '../actions/alert';
import Alert from '../components/Alert';

const AlertContainer = ({ alert, hideAlert }) => (
  alert.show && (
    <Alert
      body={alert.bodyText}
      buttonText={alert.buttonText}
      onAction={() => {
        alert.onAction && alert.onAction();
        hideAlert();
      }}
    />
  )
);

AlertContainer.propTypes = {
  alert: PropTypes.shape({
    show: PropTypes.bool,
    bodyText: PropTypes.string,
    buttonText: PropTypes.string,
    onAction: PropTypes.func,
  }),
  hideAlert: PropTypes.func,
}

const mapStateToProps = (state) => ({
  alert: state.alert
});

const mapDispatchToProps = (dispatch) => ({
  hideAlert: () => dispatch(hideAlert())
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertContainer);
