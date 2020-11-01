import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const AccountNav = ({userId}) => {
  return (
    <Nav className='flex-column'>
      <Nav.Link activeClassName='selected' as={NavLink} to={`/user-profile/${userId}`}>
        View profile 
        <span role='img' aria-label='right arrow icon'> →</span>
      </Nav.Link>
      <Nav.Link activeClassName='selected' as={NavLink} to='/user/user-events'>
        Your events
        <span role='img' aria-label='right arrow icon'> →</span>
      </Nav.Link>
      <Nav.Link activeClassName='selected' as={NavLink} to={`/user/edit-profile/${userId}`}>
        Edit profile
        <span role='img' aria-label='right arrow icon'> →</span>
      </Nav.Link>
      <Nav.Link activeClassName='selected' as={NavLink} to='/user/change-password'>
        Change password
        <span role='img' aria-label='right arrow icon'> →</span>
      </Nav.Link>
      <Nav.Link activeClassName='selected' as={NavLink} to='/user/photo'>
        Photo upload
        <span role='img' aria-label='right arrow icon'> →</span>
      </Nav.Link>
    </Nav>
  );
};

export default AccountNav;
