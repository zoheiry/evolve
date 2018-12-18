import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BackgroundImage1 from '../../static/img/landscape-background1.jpg';
import BackgroundImage2 from '../../static/img/landscape-background2.jpg';
import BackgroundImage3 from '../../static/img/landscape-background3.jpg';

const Wrapper = styled('div')`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: url(${p => p.backgroundImage});
  background-size: cover;
  justify-content: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .5);
  }
`;

const Content = styled('div')`
  position: relative;
  text-align: center;
`;

const getImage = (number) => {
  switch (number) {
    case 1:
      return BackgroundImage1;
    case 2:
      return BackgroundImage2;
    case 3:
      return BackgroundImage3;
    default:
      return BackgroundImage1;
  }
}

const FullPageBackground = ({ children, imageNumber }) => (
  <Wrapper backgroundImage={getImage(imageNumber)}>
    <Content>{children}</Content>
  </Wrapper>
);

FullPageBackground.propTypes = {
  children: PropTypes.node,
  imageNumber: PropTypes.number,
};

FullPageBackground.defaultProps = {
  imageNumber: 1,
};

export default FullPageBackground;
