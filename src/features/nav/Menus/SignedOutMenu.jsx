import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const activeClassName = 'nav-item-active';

const NaviLink = styled(NavLink).attrs({ activeClassName })`
  color: #333;
  font-weight: 400;
  font-size: 0.9rem;
  padding: 0 0.5rem;
  &:hover {
    text-decoration: none;
    color: #98b5ff;
  }
  &.${activeClassName} {
    color: #98b5ff;
  }
`;

const SignedOutMenu = () => {
  return (
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='ml-auto'>
        <NaviLink exact to='/'>
          Events
        </NaviLink>
        <NaviLink to='/login'>Log in</NaviLink>
        <NaviLink to='/signup'>Sign up</NaviLink>
      </Nav>
    </Navbar.Collapse>
  );
};

export default SignedOutMenu;
