import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled('nav')`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #FFF;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .2);
  display: flex;
  justify-content: space-between;
  padding: 15px;
  color: #FFF;
  background: ${p => p.theme.primary};
`;

const Logo = styled('div')`
  font-weight: bold;
  font-style: italic;
  font-size: 20px;
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

const Navbar = () => (
  <Wrapper>
    <Logo>Logo</Logo>
    <NavItems>
      <Link to="/activities"><Icon className="fas fa-list-ul" /></Link>
      <Link to="/schedule"><Icon className="fas fa-calendar-alt" /></Link>
    </NavItems>
  </Wrapper>
);

export default Navbar;
