import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Button = styled(Link)`
  display: block;
  background: #FFF;
  color: #000;
  padding: 12px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  border: solid 1px ${p => p.theme.primary};
  color: ${p => p.theme.primary};
  text-decoration: none;
`;

const AddActivityButton = () => (
  <Button to='/activity/new'>+ Add activity</Button>
);

export default AddActivityButton;
