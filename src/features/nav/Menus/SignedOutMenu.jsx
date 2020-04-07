import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SignedOutMenu = () => {
  return (
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='ml-auto'>
        <Link className='nav-link' to='/'>Events</Link> 
        <Link className='nav-link' to='/login'>Log in</Link>
        <Link className='nav-link' to='/signup'>Sign up</Link>
      </Nav>
    </Navbar.Collapse>
  );
};

export default SignedOutMenu;
