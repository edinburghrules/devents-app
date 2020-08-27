import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const AccountNav = () => {
  return (
    <Nav className='flex-column'>
      <Nav.Link activeClassName="selected" as={NavLink} to='/detailed-user'>View profile</Nav.Link>
      <Nav.Link activeClassName="selected" as={NavLink} to='/user/profile'>Edit profile</Nav.Link>
      <Nav.Link activeClassName="selected"  as={NavLink} to='/user/account'>Change password</Nav.Link>
      <Nav.Link activeClassName="selected" as={NavLink} to='/user/photo'>Photo upload</Nav.Link>
    </Nav>
  );
};

export default AccountNav;
