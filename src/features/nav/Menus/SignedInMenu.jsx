import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavDropdown, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { logout } from '../../../app/redux/actions/authActions';

const SignedInMenu = ({ logout, userProfile }) => {
  return (
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='ml-auto'>
        <Link className='nav-link mr-5' to='/'>
          Events
        </Link>
        <Image
          className='nav-avatar'
          src={
            userProfile && userProfile.photoURL ? userProfile.photoURL : '/assets/profile.png'
          }
          roundedCircle
        />
        <NavDropdown
          title={(userProfile && userProfile.displayName) || 'displayname'}
          id='basic-nav-dropdown'
        >
          <Link className='dropdown-item' to='/createEvent'>
            Create Event
          </Link>
          <Link to={'/user'} className='dropdown-item'>
            Account
          </Link>
          <Button as={Link} to={'/'} className='dropdown-item' onClick={logout}>
            Log out
          </Button>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  );
};

const mapDispatchToProps = {
  logout,
};

export default connect(null, mapDispatchToProps)(SignedInMenu);
