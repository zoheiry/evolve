import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiCalendar, FiLogOut, FiActivity } from 'react-icons/fi';

import { deleteCookie } from '../../utils/cookies';
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
  display: flex;
  align-items: center;
  justify-content: flex-end;
  > *:not(:last-child) {
    margin-right: 20px;
  }
`;

const IconWrapper = styled('div')`
  display: flex;
  font-size: 20px;
  color: #FFF;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #FFF;
`;

const logout = (props) => {
  deleteCookie('auth');
  window.location.href = '/login';
}

const Navbar = (props) => (
  <UserDataProvider
    render={({ user }) => {
      if (!user || !user.id) {
        return null;
      }
      return (
        <Wrapper>
          <Logo>
            <StyledLink to="/"><img src={LogoImage} alt="Logo" /></StyledLink>
          </Logo>
          <NavItems>
            <StyledLink to="/activities">
              <IconWrapper><FiActivity /></IconWrapper>
            </StyledLink>
            <StyledLink to="/schedule">
              <IconWrapper><FiCalendar /></IconWrapper>
            </StyledLink>
            <IconWrapper><FiLogOut onClick={() => logout(props)}/></IconWrapper>
          </NavItems>
        </Wrapper>
      );
    }}
  />
);

export default Navbar;
