import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AccountNav from './AccountNav';
import PhotoPage from './PhotoPage';
import ChangePasswordPage from './ChangePasswordPage';
import EditProfile from './EditProfile';
import DetailedUserPage from '../DetailedUser/DetailedUserPage';
import { AccountDashboardContainer } from '../../../app/styled/settings/AccountDashboard';

const AccountDashboard = ({ providerId, profile }) => {
  return (
    <div className='page-content'>
      <AccountDashboardContainer>
        <Row>
          <Col>
            <AccountNav />
          </Col>
          <Col lg={8}>
            <Switch>
              <Redirect exact from='/user' to='user/edit-profile' />
              <Route
                path='/detailed-user'
                render={() => <DetailedUserPage />}
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
                path='/user/edit-profile'
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
