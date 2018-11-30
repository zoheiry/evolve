import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { upperFirst, get } from 'lodash';
import { Table } from '@fashiontrade/wardrobe';
import UserDataProvider from '../../containers/UserDataProvider';
import Button from '../Button';
import WEEK_DAYS from '../../constants/WeekDays';
import { START_TIME, END_TIME } from '../../constants/TimeTypes';
import TimeField from './TimeField';

const TableHeader = styled(Table.Header)`
  background: #0cb67e !important;
  color: #FFF;
`;

const TableRow = styled(Table.Row)`
  align-items: center;
`;

const Label = styled('div')`
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ScheduleWrapper = styled('div')`
  width: 800px;
  margin: 0 auto;
  max-width: 100%;
`;

const StyledTable = styled(Table)`
  height: calc(100vh - 42px);
`;

class ScheduleForm extends Component {
  constructor(props) {
    super();
    this.state = {
      props: {
        schedule: props.schedule
      },
      schedule: props.schedule || this.generateEmptySchedule()
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.schedule !== prevState.props.schedule) {
      console.log(nextProps.schedule);
      return {
        props: {
          schedule: nextProps.schedule
        },
        schedule: nextProps.schedule
      }
    }
  }

  generateEmptySchedule = () => (
    WEEK_DAYS.reduce((result, day) => ({
      ...result,
      [day]: {
        [START_TIME]: null,
        [END_TIME]: null
      }
    }), {})
  );

  handleSubmit = (updateSchedule) => {
    updateSchedule(this.state.schedule);
  };

  handleTimeChange = (day, time, type) => {
    if (!time) {
      return;
    }
    const { schedule } = this.state;
    this.setState({
      schedule: {
        ...schedule,
        [day]: {
          ...schedule[day],
          [type]: time
        }
      }
    })
  }

  render() {
    return (
      <ScheduleWrapper>
        <StyledTable layout={[0.1, 1, 1]}>
          <TableHeader>
            <Table.Cell>Day</Table.Cell>
            <Table.Cell>Start time</Table.Cell>
            <Table.Cell>End time</Table.Cell>
          </TableHeader>
          {
            WEEK_DAYS.map(day =>
              <TableRow key={`${day}-field`}>
                <Table.Cell><Label>{upperFirst(day)}</Label></Table.Cell>
                <Table.Cell>
                  <TimeField
                    onChange={(time) => this.handleTimeChange(day, time, START_TIME)}
                    appearance="start"
                    value={get(this.state, `schedule.${day}.${START_TIME}`)}
                  />
                </Table.Cell>
                <Table.Cell>
                  <TimeField
                    onChange={(time) => this.handleTimeChange(day, time, END_TIME)}
                    appearance="end"
                    value={get(this.state, `schedule.${day}.${END_TIME}`)}
                  />
                </Table.Cell>
              </TableRow>
            )
          }
        </StyledTable>
        <UserDataProvider render={({ updateSchedule }) => (
          <Button fluid onClick={() => this.handleSubmit(updateSchedule)}>Next</Button>
        )} />
      </ScheduleWrapper>
    );
  }
};

ScheduleForm.propTypes = {
  schedule: PropTypes.object
}

export default ScheduleForm;
