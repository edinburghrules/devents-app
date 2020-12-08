import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const NavContainer = styled(Nav)`
  display: flex;
  flex-direction: column;

  @media(max-width: 992px) {
    flex-direction: row;
    justify-content: center;
    margin-bottom: 4rem;
    border-bottom: 1px solid #ccc;
    padding-bottom: 1rem;
  }
`;

const NavItem = styled(NavLink)`
  color: #333;
  margin-bottom: 2rem;
  display: flex;
  font-weight: 400;

  @media(max-width: 992px) {
    margin-right: 1rem;
    font-weight: 500;
    border: 1px solid #ccc;
    padding: .5rem;
    border-radius: 4px;
    display: block;
  }


  &:hover {
    text-decoration: none;
    color: #222;
  }

  &.active {
    color: #007bff;
  }
`;

const AccountNav = ({userId}) => {
  return (
    <NavContainer>
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
    </NavContainer>
  );
};

export default AccountNav;
