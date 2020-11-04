import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Navbar, Nav, NavDropdown, Button, Spinner, Image } from 'react-bootstrap';
import { withRouter, NavLink } from 'react-router-dom';
import { logout } from '../../../app/redux/actions/authActions';

const activeClassName = 'nav-item-active'

const NaviLink = styled(NavLink).attrs({ activeClassName })`
  color: #333;
  font-weight: 400;
  font-size: .9rem;
  padding: 0 .5rem;
  &:hover {
    text-decoration: none;
    color: #98b5ff;
  }
  &.${activeClassName} {
    color: #222;
  }
`;

const NavAvatar = styled(Image)`
  height: 30px;
  width: 30px;
`;

const NavDropdownLink = styled(NavLink)`
  font-size: 0.8rem;
  background: #fff !important;
  color: #222 !important;
  margin: 0 !important;
  margin-top: .5rem !important;

  &:hover {
    background: #eee !important;
    border-radius: 0 !important;
  }
`;

class SignedInMenu extends React.Component {
  handleClick = async () => {
    await this.props.logout();
    this.props.history.push('/login');
  };
  render() {
    return (
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav
          style={{ display: 'flex', alignItems: 'center' }}
          className='ml-auto'
        >
          <NaviLink exact to='/'>
            Events
          </NaviLink>
          <NavDropdown
            style={{ padding: '0 .5rem' }}
            title={
              this.props.upLoading ? (
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
              )
            }
            id='basic-nav-dropdown'
          >
            <NavDropdownLink className='dropdown-item' to='/createEvent'>
              Create Event
            </NavDropdownLink>
            <NavDropdownLink
              to={`/user/edit-profile/${this.props.userProfile.uid}`}
              className='dropdown-item'
            >
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
