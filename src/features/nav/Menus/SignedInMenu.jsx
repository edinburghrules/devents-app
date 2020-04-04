import React from 'react';
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';

const SignedInMenu = () => {
  return (
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='ml-auto'>
      <Image className='avatar-img' src="https://randomuser.me/api/portraits/thumb/men/75.jpg" roundedCircle />
        <NavDropdown title='Sean Adamson' id='basic-nav-dropdown'>
          <NavDropdown.Item href='#action/3.1'>Create Event</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href='#action/3.2'>My Events</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href='#action/3.3'>My Network</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href='#action/3.3'>My Profile</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  );
};

export default SignedInMenu;
