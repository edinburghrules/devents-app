import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NaviLink } from '../../../app/styled/nav/Menus/SignedInMenu';

const SignedOutMenu = () => {
  return (
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='ml-auto'>
        <NaviLink exact to='/'>
          Events
        </NaviLink>
        <NaviLink to='/login'>
          Log in
        </NaviLink>
        <NaviLink to='/signup'>
          Sign up
        </NaviLink>
      </Nav>
    </Navbar.Collapse>
  );
};

export default SignedOutMenu;
