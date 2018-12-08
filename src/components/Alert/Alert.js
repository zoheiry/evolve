import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { hideAlert } from '../../actions/alert';
import Button from '../Button';

const Backdrop = styled('div')`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, .3);
  z-index: 10;
`;

const AlertWindow = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #FFF;
  width: 70%;
  max-width: 400px;
  min-height: 180px;
  padding: 15px;
  ${p => p.theme.defaultShadow};
`;

const AlertBody = styled('div')`
  flex-grow: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AlertAction = styled('div')`
  width: 100%;
`;

const Alert = ({ alert, hideAlert }) => (
  alert.show && (
    <Backdrop>
      <AlertWindow>
        <AlertBody>{alert.bodyText || 'Something went wrong'}</AlertBody>
        <AlertAction>
          <Button fluid onClick={alert.onClose || hideAlert}>{alert.buttonText || 'Close'}</Button>
        </AlertAction>
      </AlertWindow>
    </Backdrop>
  )
);

Alert.propTypes = {
  alert: PropTypes.object,
  hideAlert: PropTypes.func,
};

const mapStateToProps = (state) => ({
  alert: state.alert
});

const mapDispatchToProps = (dispatch) => ({
  hideAlert: () => dispatch(hideAlert())
});

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
