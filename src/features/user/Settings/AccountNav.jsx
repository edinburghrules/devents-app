import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const NavItem = styled(NavLink)`
  color: #000;
  margin-bottom: 2rem;
  display: flex;

  &:hover {
    text-decoration: none;
    color: #000;
  }

  &.active {
    color: #1769ff;
  }
`;

const AccountNav = ({userId}) => {
  return (
    <Nav className='flex-column'>
      <NavItem to={`/user-profile/${userId}`}>
        View profile 
      </NavItem>
      <NavItem to='/user/user-events'>
        Your events
      </NavItem>
      <NavItem to={`/user/edit-profile/${userId}`}>
        Edit profile
      </NavItem>
      <NavItem to='/user/change-password'>
        Change password
      </NavItem>
      <NavItem to='/user/photo'>
        Photo upload
      </NavItem>
    </Nav>
  );
};

export default AccountNav;
