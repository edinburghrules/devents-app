import React from 'react';
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
 
const SignedInMenu = () => {
  return (
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='ml-auto'>
      <Link className='nav-link mr-5' to='/'>Events</Link> 
      <Image className='nav-avatar' src="https://randomuser.me/api/portraits/thumb/men/75.jpg" roundedCircle />
        <NavDropdown title='Sean Adamson' id='basic-nav-dropdown'>
          <Link className='dropdown-item' to='/eventform'>Create Event</Link>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  );
};

export default SignedInMenu;
