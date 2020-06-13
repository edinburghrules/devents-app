import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { Route, Switch, Redirect } from 'react-router-dom';
import AccountNav from './AccountNav';
import PhotoPage from './PhotoPage';
import AccountPage from './AccountPage';
import Profile from './Profile';
import PublicProfile from './PublicProfile';

const AccountDashboard = () => {
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
            <Redirect exact from='/user' to='user/account' />
            <Route path='/user/photo' component={PhotoPage}/>
            <Route path='/user/account' component={AccountPage}/>
            <Route path='/user/profile' component={Profile}/>
            <Route path='/user/public-profile' component={PublicProfile}/>
          </Switch>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AccountDashboard;
