import React from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
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
  margin-top: 6rem;
  display: grid;
  grid-template-columns: 25% 75%;

  @media(max-width: 992px) {
    margin-top: 2rem;
    grid-template-columns: 100%;
  }
`;

const AccountNavContainer = styled.div`
  @media(max-width: 992px) {
    grid-column: 1/3;
  }
`;

const AccountPagesContainer = styled.div`

`;

const AccountDashboard = ({
  providerId,
  profile,
  pastEvents,
  futureEvents,
  hosting,
}) => {
  return (
    <AccountDashboardContainer>
    <AccountNavContainer>
      <AccountNav userId={profile.uid} />
    </AccountNavContainer>
    <AccountPagesContainer>
      <Switch>
        <Redirect exact from='/user' to='/' />
        <Route path='/user-profile/:id' render={() => <UserProfilePage />} />
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
          render={() => (
            <AccountEvents events={{ pastEvents, futureEvents, hosting }} />
          )}
        />
      </Switch>
      </AccountPagesContainer>
    </AccountDashboardContainer>
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
