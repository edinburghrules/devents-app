import React from 'react';
import styled from 'styled-components';
import { Col, Row, Container } from 'react-bootstrap';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AccountNav from './AccountNav';
import PhotoPage from './PhotoPage';
import ChangePasswordPage from './ChangePasswordPage';
import EditProfile from './EditProfile';
import UserProfilePage from '../UserProfile/UserProfilePage';

const AccountDashboardContainer = styled(Container)`
  margin-top: 10rem;
`;  

const AccountDashboard = ({ providerId, profile }) => {
  return (
    <div className='page-content'>
      <AccountDashboardContainer>
        <Row>
          <Col>
            <AccountNav userId={profile.uid} />
          </Col>
          <Col lg={8}>
            <Switch>
              <Redirect exact from='/user' to='/' />
              <Route
                path='/user-profile/:id'
                render={() => <UserProfilePage />}
              />
              <Route
                path='/user/photo'
                render={() => <PhotoPage profilePhoto={profile.photoURL} />}
              />
              <Route
                path='/user/change-password'
                render={() => <ChangePasswordPage providerId={providerId} />}
              />
              <Route
                path='/user/edit-profile/:id'
                render={() => <EditProfile profile={profile && profile} />}
              />
            </Switch>
          </Col>
        </Row>
      </AccountDashboardContainer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  providerId: state.auth.currentUser.providerData[0].providerId,
  profile: state.profile.userProfile,
});

export default connect(mapStateToProps)(AccountDashboard);
