import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { isEmpty } from 'lodash';

import Button from '../Button';
import PrioritySelector from './PrioritySelector';
import * as PROPERTIES from '../../constants/ActivityProperties'; 

const Title = styled('h1')`
  font-size: 20px;
  text-align: center;
  margin: 0;
  padding: 15px;
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
  height: ${p => p.theme.fullContentHeight};
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

const PriorityField = styled('div')`
  ${commonFieldStyles}
  padding: 15px 8px;
`;

const Label = styled('span')`
  font-weight: bold;
  display: inline-block;
  margin-bottom: 15px;
`;

const Fields = styled('div')`
  flex-grow: 1;
`;

const DeleteButton = styled('a')`
  color: ${p => p.theme.danger};
  text-decoration: underline;
  display: block;
  text-align: center;
  font-size: 14px;
  padding-top: 15px;
  font-weight: bold;
`;

class ActivityForm extends PureComponent {
  constructor(props) {
    super(props);
    const { activity = {} } = props; 
    this.state = {
      activity: {
        [PROPERTIES.NAME]: activity[PROPERTIES.NAME] || '',
        [PROPERTIES.PRIORITY]: activity[PROPERTIES.PRIORITY],
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
        return !!value && value > 0 && value < 6 && Number.isInteger(Number(value));
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

  handleChange = (property, value) => {
    this.setState({
      activity: {
        ...this.state.activity,
        [property]: value
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
        <Title>{this.props.activity ? 'Edit' : 'Add'} activity</Title>
        <Fields>
          <Input
            value={name}
            type="text"
            placeholder="* Activity name (e.g Game development course)"
            required
            onChange={(e) => this.handleChange(PROPERTIES.NAME, e.target.value)}
          />
          <PriorityField>
            <Label>Priority</Label>
            <PrioritySelector
              selectedPriority={priority}
              onSelect={(value) => this.handleChange(PROPERTIES.PRIORITY, value)}
            />
          </PriorityField>
          <TextArea
            value={notes}
            placeholder="Notes on this activity (e.g links, resources, etc..)"
            onChange={(e) => this.handleChange(PROPERTIES.NOTES, e.target.value)}
          />
          <Input
            value={maxDuration}
            type="number"
            placeholder="Maximum duration you want to spend (in hours)"
            onChange={(e) => this.handleChange(PROPERTIES.MAX_DURATION, e.target.value)}
          />
        </Fields>
        <Button onClick={this.handleSubmit} disabled={!this.isFormValid()}>Submit</Button>
        {this.props.onDelete && (
          <DeleteButton onClick={this.props.onDelete}>Delete activity</DeleteButton>
        )}
      </Form>
    );
  }
}

ActivityForm.propTypes = {
  activity: PropTypes.object,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ActivityForm;
