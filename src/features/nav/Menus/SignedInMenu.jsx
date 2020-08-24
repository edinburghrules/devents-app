import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavDropdown, Image, Button, Spinner } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { logout } from '../../../app/redux/actions/authActions';

class SignedInMenu extends React.Component {
  render() {
    console.log(this.props);
    return (
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto'>
          <Link className='nav-link mr-5' to='/'>
            Events
          </Link>
          {this.props.loading ? (<Spinner animation='border' variant='primary' size='sm'/>) : (<Image
            className='nav-avatar'
            src={
              this.props.userProfile && this.props.userProfile.photoURL
                ? this.props.userProfile.photoURL
                : '/assets/profile.png'
            }
            roundedCircle
          />)}
          <NavDropdown
            title={(this.props.userProfile && this.props.userProfile.displayName) || 'displayname'}
            id='basic-nav-dropdown'
          >
            <Link className='dropdown-item' to='/createEvent'>
              Create Event
            </Link>
            <Link to={'/user'} className='dropdown-item'>
              Account
            </Link>
            <Button
              as={Link}
              to={'/'}
              className='dropdown-item'
              onClick={() => this.props.logout(this.props.history)}
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
  logout
}

export default connect(null, mapDispatchToProps)(withRouter(SignedInMenu));
