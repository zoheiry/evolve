import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const fixedHeightCss = css`
  height: 100vh;
  > * {
    height: 100%;
  }
`;

const Wrapper = styled('div')`
  padding-top: ${p => p.theme.bodyTopPadding};
  ${p => p.fixedHeight && fixedHeightCss}
`;

const PageWrapper = ({ children, fixedHeight }) => (
  <Wrapper fixedHeight={fixedHeight}>{children}</Wrapper>
);

PageWrapper.propTypes = {
  children: PropTypes.node,
  fixedHeight: PropTypes.bool
};

PageWrapper.defaultProps = {
  fixedHeight: true,
};

export default PageWrapper;
