import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AccountNav from './AccountNav';
import PhotoPage from './PhotoPage';
import AccountPage from './AccountPage';
import Profile from './Profile';

const mapStateToProps = (state) => ({
  providerId: state.user.currentUser.providerData['0'].providerId,
  user: state.user.userProfile
});

const AccountDashboard = ({providerId, user}) => {
  return (
    <div className='page-content'>
      <Container>
        <h2 className='mb-5'>Account Dashboard</h2>
        <Row>
          <Col>
            <AccountNav/>
          </Col>
          <Col lg={8}>
          <Switch>
            <Redirect exact from='/user' to='user/profile' />
            <Route path='/user/photo' component={PhotoPage}/>
            <Route path='/user/account' render={() => <AccountPage providerId={providerId}/>}/>
            <Route path='/user/profile' render={() => <Profile user={user}/>}/>
          </Switch>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default connect(mapStateToProps)(AccountDashboard);
