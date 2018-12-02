import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { isEmpty } from 'lodash';

import Button from '../Button';
import * as PROPERTIES from '../../constants/ActivityProperties'; 

const Title = styled('h1')`
  font-size: 20px;
  text-align: center;
  margin: 0;
  padding: 20px 10px;
`;

const commonFieldStyles = css`
  width: 100%;
  border: solid 1px #ddd;
  padding: 8px;
  font-size: 14px;
  margin-bottom: 20px;
`;

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 800px;
  margin: 0 auto;
  max-width: 100%;
  height: 100vh;
  padding: 15px;
  padding-top: 0;
`;

const Input = styled('input')`
  ${commonFieldStyles}
`;

const TextArea = styled('textarea')`
  ${commonFieldStyles}
  height: 150px;
  resize: none;
`;

const Fields = styled('div')`
  flex-grow: 1;
`;

class ActivityForm extends Component {
  constructor(props) {
    super(props);
    const { activity = {} } = props; 
    this.state = {
      activity: {
        [PROPERTIES.NAME]: activity[PROPERTIES.NAME] || '',
        [PROPERTIES.PRIORITY]: activity[PROPERTIES.PRIORITY] || '',
        [PROPERTIES.NOTES]: activity[PROPERTIES.NOTES] || '',
        [PROPERTIES.MAX_DURATION]: activity[PROPERTIES.MAX_DURATION] || ''
      }
    }
  }

  getInvalidFields = () => (
    Object.values(PROPERTIES).reduce((result, property) => {
      if (!this.validProperty(property, this.state.activity[property])) {
        return result.concat(property);
      }
      return result;
    }, [])
  );

  isFormValid = () => {
    const invalidFields = this.getInvalidFields();
    return !invalidFields.length
  }

  validProperty = (property, value) => {
    switch (property) {
      case PROPERTIES.NAME: {
        return !isEmpty(value);
      }
      case PROPERTIES.PRIORITY: {
        return !isEmpty(value) && value > 0 && value < 6 && Number.isInteger(Number(value));
      }
      case PROPERTIES.NOTES: {
        return true;
      }
      case PROPERTIES.MAX_DURATION: {
        return !value || Number(value);
      }
      default:
        return false;
    }
  }

  handleChange = (property, target) => {
    this.setState({
      activity: {
        ...this.state.activity,
        [property]: target.value
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.isFormValid()) {
      return;
    }
    this.props.onSubmit(this.state.activity);
  }

  render() {
    const { name, priority, notes, maxDuration } = this.state.activity;
    return (
      <Form>
        <Title>Add an activity</Title>
        <Fields>
          <Input
            value={name}
            type="text"
            placeholder="* Activity name (e.g Game development course)"
            required
            onChange={(e) => this.handleChange(PROPERTIES.NAME, e.target)}
          />
          <Input
            value={priority}
            placeholder="* Priority of this activity (number from 1 to 5)"
            type="number"
            min="1"
            max="5"
            required
            onChange={(e) => this.handleChange(PROPERTIES.PRIORITY, e.target)}
          />
          <TextArea
            value={notes}
            placeholder="Notes on this activity (e.g links, resources, etc..)"
            onChange={(e) => this.handleChange(PROPERTIES.NOTES, e.target)}
          />
          <Input
            value={maxDuration}
            type="number"
            placeholder="Maximum duration you want to spend (in hours)"
            onChange={(e) => this.handleChange(PROPERTIES.MAX_DURATION, e.target)}
          />
        </Fields>
        <Button onClick={this.handleSubmit} disabled={!this.isFormValid()}>Submit</Button>
      </Form>
    );
  }
}

ActivityForm.propTypes = {
  activity: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default ActivityForm;
