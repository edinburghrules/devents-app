import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AccountNav from './AccountNav';
import PhotoPage from './PhotoPage';
import AccountPage from './AccountPage';
import Profile from './Profile';
import DetailedUserPage from '../DetailedUser/DetailedUserPage';

const AccountDashboard = ({ providerId, profile }) => {
  return (
    <div className='page-content'>
      <Container>
        <h2 className='mb-5'>Account Dashboard</h2>
        <Row>
          <Col>
            <AccountNav />
          </Col>
          <Col lg={8}>
            <Switch>
              <Redirect exact from='/user' to='user/profile' />
              <Route
                path='/detailed-user'
                render={() => <DetailedUserPage />}
              />
              <Route
                path='/user/photo'
                render={() => <PhotoPage profilePhoto={profile.photoURL} />}
              />
              <Route
                path='/user/account'
                render={() => <AccountPage providerId={providerId} />}
              />
              <Route
                path='/user/profile'
                render={() => <Profile profile={profile && profile} />}
              />
            </Switch>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  providerId: state.user.currentUser.providerData[0].providerId,
  profile: state.profile.userProfile,
});

export default connect(mapStateToProps)(AccountDashboard);
