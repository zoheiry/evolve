import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import UserDataProvider from '../../containers/UserDataProvider';

import { COMPLETE } from '../../constants/OnBoardingStates';

const fixedHeightCss = css`
  height: 100vh;
  > * {
    height: 100%;
  }
`;

const Wrapper = styled('div')`
  padding-top: ${p => (p.navbarVisible ? p.theme.bodyTopPadding : 0)};
  ${p => p.fixedHeight && fixedHeightCss}
`;

const PageWrapper = ({ children, fixedHeight }) => (
  <UserDataProvider
    render={({ user }) =>
      <Wrapper
        navbarVisible={user.onBoardingState === COMPLETE}
        fixedHeight={fixedHeight}
      >
        {children}
      </Wrapper>
    }
  />
);

PageWrapper.propTypes = {
  children: PropTypes.node,
  fixedHeight: PropTypes.bool
};

PageWrapper.defaultProps = {
  fixedHeight: true,
};

export default PageWrapper;
