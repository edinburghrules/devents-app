import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar } from 'react-bootstrap';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';

class NavBar extends Component {

  render() {
    const {authenticated, profile, loading} = this.props;
    return (
      <Navbar fixed='top' className='navbar' expand='lg'>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        {authenticated ? (<SignedInMenu loading={loading} userProfile={profile}/>) : (<SignedOutMenu/>)}
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: Boolean(state.user.currentUser.email),
  profile: state.profile.userProfile,
  loading: state.async.loading
})

export default connect(mapStateToProps)(NavBar);
