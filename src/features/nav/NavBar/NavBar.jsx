import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavBar } from '../../../app/styled/nav/NavBar/NavBar';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';

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
