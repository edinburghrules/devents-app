import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';

class NavBar extends Component {
  render() {
    const authenticated = true;
    return (
      <Navbar fixed='top' className='navbar' expand='lg'>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        {authenticated ? (<SignedInMenu/>) : (<SignedOutMenu/>)}
      </Navbar>
    );
  }
}

export default NavBar;
