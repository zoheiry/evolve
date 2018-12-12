import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import UserDataProvider from '../../containers/UserDataProvider';
import LogoImage from '../../static/img/logo.png';

const Wrapper = styled('nav')`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #FFF;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  color: #FFF;
  background: ${p => p.theme.primary};
`;

const Logo = styled('div')`
  img {
    width: 55px;
  }
`;

const NavItems = styled('div')`
  > *:not(:last-child) {
    margin-right: 20px;
  }
`;

const Icon = styled('div')`
  font-size: 20px;
  color: #FFF;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #FFF;
`;

const Navbar = () => (
  <UserDataProvider
    render={({ user }) => {
      if (!user || !user.id || user.onBoardingState === 'fresh') {
        return null;
      }
      return (
        <Wrapper>
          <Logo>
            <StyledLink to="/"><img src={LogoImage} alt="Logo" /></StyledLink>
          </Logo>
          <NavItems>
            <StyledLink to="/activities"><Icon className="fas fa-list-ul" /></StyledLink>
            <StyledLink to="/schedule"><Icon className="fas fa-calendar-alt" /></StyledLink>
          </NavItems>
        </Wrapper>
      );
    }}
  />
);

export default Navbar;
