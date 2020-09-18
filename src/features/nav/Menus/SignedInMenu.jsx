import React from 'react';
import { connect } from 'react-redux';
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Spinner,
} from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import {NavAvatar, NavDropdownLink} from '../../../app/styled/nav/Menus/SignedInMenu';
import { logout } from '../../../app/redux/actions/authActions';

class SignedInMenu extends React.Component {
  handleClick = async () => {
    await this.props.logout();
    this.props.history.push('/login')
  }
  render() {
    return (
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto'>
          <Link className='nav-link mr-5' to='/'>
            Events
          </Link>
          {this.props.upLoading ? (
            <Spinner animation='border' variant='primary' size='sm' />
          ) : (
            <NavAvatar
              src={
                this.props.userProfile.photoURL
                  ? this.props.userProfile.photoURL
                  : '/assets/profile.png'
              }
              roundedCircle
            />
          )}
          <NavDropdown
            title={
              (this.props.userProfile && this.props.userProfile.displayName) ||
              'displayname'
            }
            id='basic-nav-dropdown'
          >
            <NavDropdownLink className='dropdown-item' to='/createEvent'>
              Create Event
            </NavDropdownLink>
            <NavDropdownLink to={`/user/edit-profile/${this.props.userProfile.uid}`} className='dropdown-item'>
              Account
            </NavDropdownLink>
            <Button
              as={NavDropdownLink}
              to={'/'}
              className='dropdown-item'
              onClick={this.handleClick}
            >
              Log out
            </Button>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    );
  }
}

const mapDispatchToProps = {
  logout,
};

export default connect(null, mapDispatchToProps)(withRouter(SignedInMenu));
