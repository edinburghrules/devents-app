import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar } from 'react-bootstrap';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';

class NavBar extends Component {

  render() {
    const {authenticated, userProfile} = this.props;
    return (
      <Navbar fixed='top' className='navbar' expand='lg'>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        {authenticated ? (<SignedInMenu userProfile={userProfile}/>) : (<SignedOutMenu/>)}
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: Boolean(state.user.currentUser.email),
  userProfile: state.user.userProfile
})

export default connect(mapStateToProps)(NavBar);
