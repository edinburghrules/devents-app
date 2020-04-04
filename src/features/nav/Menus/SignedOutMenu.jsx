import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const SignedOutMenu = () => {
  return (
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='ml-auto'>
        <Nav.Link href='#home'>Log in</Nav.Link>
        <Nav.Link href='#link'>Sign up</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  )
};

export default SignedOutMenu;
