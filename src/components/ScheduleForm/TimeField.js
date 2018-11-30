import React from 'react';
import PropTypes from 'prop-types';
import ReactTimeField from 'react-simple-timefield';
import styled from 'styled-components';

const TimeFieldWrapper = styled('span')`
  display: inline-flex;
  align-items: center;
  position: relative;
  max-width: 100%;
`;

const Icon = styled('span')`
  font-size: 18px;
  position: absolute;
  left: 5px;
  pointer-events: none;
  color: ${p => (p.appearance === 'start' ? '#0cb67e' : '#ec4c21')};
`;

const StyledInput = styled('input')`
  padding: 8px;
  padding-left: 28px;
  font-size: 14px;
  max-width: 100%;
  border: solid 1px #ddd;
`;

const TimeField = ({ value, ...props }) => (
  <TimeFieldWrapper>
    <ReactTimeField value={value || '--:--'} {...props} input={<StyledInput />}/>
    <Icon className="fas fa-clock" appearance={props.appearance} />
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
