import React from 'react';
import PropTypes from 'prop-types';
import ReactTimeField from 'react-simple-timefield';
import styled from 'styled-components';
import { FiClock, FiXCircle } from 'react-icons/fi';

const TimeFieldWrapper = styled('span')`
  display: inline-flex;
  align-items: center;
  position: relative;
  max-width: 100%;
`;

const IconWrapper = styled('span')`
  display: flex;
  position: absolute;
`;

const ClockIconWrapper = styled(IconWrapper)`
  font-size: 18px;
  left: 8px;
  pointer-events: none;
  color: ${p => (p.appearance === 'start' ? p.theme.primary : p.theme.danger)};
`;

const ClearIconWrapper = styled(IconWrapper)`
  display: none;
  right: 8px;
  font-size: 16px;
  &:active {
    display: flex;
  }
`;

const StyledInput = styled('input')`
  padding: 8px;
  padding-left: 32px;
  font-size: 14px;
  max-width: 100%;
  border: solid 1px #ddd;
  &:focus + ${ClearIconWrapper} {
    display: flex;
  }
`;

const TimeField = ({ value, ...props }) => (
  <TimeFieldWrapper>
    <ClockIconWrapper appearance={props.appearance}><FiClock /></ClockIconWrapper>
    <ReactTimeField
      input={<StyledInput />}
      value={value || '--:--'}
      {...props}
    />
    <ClearIconWrapper onClick={() => props.onChange('--:--')}><FiXCircle /></ClearIconWrapper>
  </TimeFieldWrapper>
);

TimeField.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  appearance: PropTypes.oneOf(['start', 'end'])
};

TimeField.defaultProps = {
  appearance: 'start'
};

export default TimeField;
