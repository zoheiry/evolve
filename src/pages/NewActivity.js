import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PageWrapper from '../components/PageWrapper';
import ActivitiesDataProvider from '../containers/ActivitiesDataProvider';
import UserDataProvider from '../containers/UserDataProvider';
import ActivityForm from '../components/ActivityForm';
import FullPageBackground from '../components/FullPageBackground';
import { Wrapper, Title, Text, Button } from '../pages/Intro';

import { ACTIVITIES, COMPLETE } from '../constants/OnBoardingStates'


class NewActivity extends PureComponent {
  state = {
    showOnBoardingStep: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.userOnboardingState === ACTIVITIES &&
      prevState.showOnBoardingStep === null
    ) {
      return { showOnBoardingStep: true };
    }
    return null;
  }

  renderOnBoardingStep = () => (
    <FullPageBackground imageNumber={3}>
      <Wrapper>
        <Title>Excellent!</Title>
        <Text>
          Now that you've set your schedule. You are ready to add your first activity.
        </Text>
        <Button
          fluid
          onClick={() => this.setState({ showOnBoardingStep: false })}
        >
          Add activity
        </Button>
      </Wrapper>
    </FullPageBackground>
  );

  render() {
    const { history, userOnboardingState } = this.props;
    if (this.state.showOnBoardingStep) {
      return this.renderOnBoardingStep();
    }

    return (
      <PageWrapper>
        <ActivitiesDataProvider
          render={({ addActivity }) =>
            <UserDataProvider
              render={({ changeOnBoardingState }) => 
                <ActivityForm
                  onSubmit={(activity) => {
                    addActivity(activity);
                    userOnboardingState === ACTIVITIES && changeOnBoardingState(COMPLETE);
                    history.push('/activities');
                  }}
                />
              }
            />
          }
        />
      </PageWrapper>
    );
    
  }
} 

NewActivity.propTypes = {
  history: PropTypes.object,
};

const mapStateToProps = (state) => ({
  userOnboardingState: state.user.onBoardingState || ''
});

export default connect(mapStateToProps)(NewActivity);
