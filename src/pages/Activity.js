import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import linkify from 'linkifyjs/html';
import { Link } from 'react-router-dom';

import priorityColors from '../constants/PriorityColors';
import PageWrapper from '../components/PageWrapper';
import Button from '../components/Button';


const Wrapper = styled('div')`
  border-left: solid 5px ${p => p.borderColor};
`;

const Section = styled('div')`
  padding: 15px;
  margin: 0 10px 15px 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .2);
`;

const Name = styled('div')`
  font-size: 22px;
  padding: 15px;
  margin-bottom: 15px;
  text-align: center;
  background: #f5f5f5;
`;

const Label = styled('div')`
  font-weight: bold;
  display: ${p => (p.inline ? 'inline-block' : 'block')};
  margin-${p => (p.inline ? 'right' : 'bottom')}: 5px;
`;

const TimeSpent = styled('div')`
  display: flex;
  align-items: center;
  line-height: 1;
`;

const ButtonWrapper = styled('div')`
  padding: 15px;
`;

const Properties = styled('div')`
  
`;

const Notes = styled('div')`
  a {
    color: #219fec;
  }
`;

const ActionsBar = styled('div')`
  padding: 15px;
  text-align: right;

  a {
    color: ${p => p.theme.success};
  }
`;

const Activity = ({ activity }) => {
  if (!activity) {
    return null;
  }

  return (
    <PageWrapper>
      <Wrapper borderColor={priorityColors[activity.priority]}>
        <ActionsBar>
          <Link to={`/activity/${activity.id}/edit`}>Edit</Link>
        </ActionsBar>
        <Properties>
          <Name>{activity.name}</Name>
          <Section>
            <TimeSpent>
              <Label inline>Time spent:</Label>
              <span>{activity.hoursSpent}h</span>
              <span>{activity.maxDuration && `/${activity.maxDuration}h`}</span>
            </TimeSpent>
          </Section>
          {activity.notes && (
            <Section>
              <Label>Notes:</Label>
              <Notes dangerouslySetInnerHTML={{__html: linkify(activity.notes)}} />
            </Section>
          )}
          <Section>
            <Label inline>Priority:</Label>
            <span color={priorityColors[activity.priority]}>{activity.priority}</span>
          </Section>
        </Properties>
        <ButtonWrapper>
          <Button fluid color={priorityColors[5]}>Start tracking</Button>
        </ButtonWrapper>
      </Wrapper>
    </PageWrapper>
  );
}

Activity.propTypes = {
  // route property
  match: PropTypes.object,
  // redux state
  activity: PropTypes.object,
}

const mapStateToProps = (state, ownProps) => ({
  activity: state.activities.items.find(a => a.id === ownProps.match.params.id)
});

export default connect(mapStateToProps)(Activity);
