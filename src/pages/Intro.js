import React from 'react';
import styled, { keyframes } from 'styled-components';

import * as states from '../constants/OnBoardingStates';
import UserDataProvider from '../containers/UserDataProvider';
import FullPageBackground from '../components/FullPageBackground';
import { SubmitButton } from '../components/Registration';

const slideInRight = keyframes`
  0% { opacity: 0; transform: translateX(-100%); }
  100% { opacity: 1; transform: translateX(0); }
`;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const zoomIn = keyframes`
  0% { transform: scale(0); }
  100% { transform: scale(1); }
`;

const slideInUp = keyframes`
  0% { opacity: 0; transform: translateY(100%); }
  100% { opacity: 1; transform: translateY(0); }
`;

export const Wrapper = styled('div')`
  color: #FFF;
  padding: 30px;
  overflow: hidden;
`;

export const Title = styled('h1')`
  color: #FFF;
  font-size: 35px;
  font-weight: 300;
  animation: ${zoomIn} 0.5s linear;
  margin: 0;
`;

export const Text = styled('p')`
  font-size: 18px;
  color: #FFF;
  animation: ${fadeIn} 0.5s linear;
  animation-fill-mode: both;
  animation-delay: 1.5s;
  margin: 15px;
`;

export const Button = styled(SubmitButton)`
  margin: 0;
  animation: ${slideInUp} 0.5s linear;
  animation-fill-mode: both;
  animation-delay: 3.5s;
`;

const Intro = () => (
  <FullPageBackground imageNumber={3}>
    <UserDataProvider render={({ changeOnBoardingState }) => (
      <Wrapper>
        <Title>Let's begin!</Title>
        <Text>
          You will now set your free time schedule for each day.
        </Text>
        <Button
          fluid
          onClick={() => changeOnBoardingState(states.SCHEDULE)}
        >
          Go to schedule
        </Button>
      </Wrapper>
    )} />
  </FullPageBackground>
);

export default Intro;
