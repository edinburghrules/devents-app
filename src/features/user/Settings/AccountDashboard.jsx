import React from 'react';
import styled from 'styled-components';
import { Col, Row, Container } from 'react-bootstrap';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AccountNav from './AccountNav';
import PhotoPage from './AccountPhoto';
import ChangePasswordPage from './AccountPassword';
import EditProfile from './AccountEdit';
import UserProfilePage from '../UserProfile/UserProfilePage';
import AccountEvents from './AccountEvents';
import { fromUnixTime } from 'date-fns';

const AccountDashboardContainer = styled(Container)`
  margin-top: 10rem;
`;

const AccountDashboard = ({ providerId, profile, pastEvents, futureEvents, hosting }) => {
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
              <Route
                path='/user/user-events'
                render={() => <AccountEvents events={{pastEvents, futureEvents, hosting}} />}
              />
            </Switch>
          </Col>
        </Row>
      </AccountDashboardContainer>
    </div>
  );
};

const eventSelector = (events, type, user) => {
  switch (type) {
    case 'past':
      return events.filter(
        (event) =>
          fromUnixTime(event.date.seconds) < new Date() &&
          event.attendees.hasOwnProperty(user)
      );
    case 'future':
      return events.filter(
        (event) =>
          fromUnixTime(event.date.seconds) > new Date() &&
          event.attendees.hasOwnProperty(user)
      );
    case 'hosting':
      return events.filter(
        (event) =>
          fromUnixTime(event.date.seconds) > new Date() &&
          event.hostedBy.hostId === user
      );
    default:
      return events;
  }
};

const mapStateToProps = (state) => ({
  providerId: state.auth.currentUser.providerData[0].providerId,
  profile: state.profile.userProfile,
  currentUser: (state.auth.currentUser && state.auth.currentUser.uid) || null,
  pastEvents: eventSelector(
    state.events.events,
    'past',
    state.auth.currentUser.uid
  ),
  futureEvents: eventSelector(
    state.events.events,
    'future',
    state.auth.currentUser.uid
  ),
  hosting: eventSelector(
    state.events.events,
    'hosting',
    state.auth.currentUser.uid
  ),
});

export default connect(mapStateToProps)(AccountDashboard);
