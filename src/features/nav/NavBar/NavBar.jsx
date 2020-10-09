import React, { Component } from 'react';
import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';

const NavBar = styled(Navbar)`
  font-weight: 400;
  font-size: 0.85rem;
  padding: 1rem !important;
  background-color: #fff !important;
  box-shadow: 0 4px 2px -2px #e0e0e0;
  padding-right: 8rem !important;
`;

class Navigation extends Component {
  render() {
    const { authenticated, profile, upLoading } = this.props;
    return (
      <NavBar fixed='top' className='navbar' expand='lg'>
        <NavBar.Toggle aria-controls='basic-navbar-nav' />
        {authenticated ? (
          <SignedInMenu upLoading={upLoading} userProfile={profile} />
        ) : (
          <SignedOutMenu />
        )}
      </NavBar>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.currentUser!== null && Boolean(state.auth.currentUser.email),
  profile: state.profile.userProfile,
  upLoading: state.async.upLoading,
});

export default connect(mapStateToProps)(Navigation);
