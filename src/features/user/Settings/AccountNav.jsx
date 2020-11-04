import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const NavItem = styled(NavLink)`
  color: #333;
  margin-bottom: 2rem;
  display: flex;
  font-weight: 400;


  &:hover {
    text-decoration: none;
    color: #222;
  }

  &.active {
    color: #222;
    font-weight: 500;
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
