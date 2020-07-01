import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const AccountNav = () => {
  return (
    <Nav className='flex-column'>
      <Nav.Link as={NavLink} to='/user/profile'>Profile</Nav.Link>
      <Nav.Link as={NavLink} to='/user/account'>Account</Nav.Link>
      <Nav.Link as={NavLink} to='/user/photo'>Photo</Nav.Link>
    </Nav>
  );
};

export default AccountNav;
