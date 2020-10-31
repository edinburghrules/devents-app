import React from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fromUnixTime } from 'date-fns';
import UserProfileHeader from './UserProfileHeader';
import UserProfileAbout from './UserProfileAbout';
import UserProfileEvents from './UserProfileEvents';

const UserProfileContainer = styled(Container)`
  margin-top: 8rem;
`;

const UserProfileCard = styled.div`
  box-shadow: 0px 2px 2px 2px #e0e0e0;
  border-radius: 8px;
  background: #ffffff;
  color: #222;
  padding: 2.5rem 3rem; 
`;

class UserProfilePage extends React.Component {
  render() {
    const {
      userProfileDetails, 
      currentUser
    } = this.props;
    return (
      <UserProfileContainer>
        <UserProfileCard>
          <UserProfileHeader currentUser={currentUser} userDetails={userProfileDetails} />
          <UserProfileAbout userDetails={userProfileDetails} />
          <UserProfileEvents />
        </UserProfileCard>
      </UserProfileContainer>
    );
  }
}

const eventSelector = (events, type, user) => {
  switch(type) {
    case 'past':
      return events.filter(event => fromUnixTime(event.date.seconds) < new Date() && event.attendees.hasOwnProperty(user));
    case 'future':
      return events.filter(event => fromUnixTime(event.date.seconds) > new Date() && event.attendees.hasOwnProperty(user));
    case 'hosting':
      return events.filter(event => fromUnixTime(event.date.seconds) > new Date() && event.hostedBy.hostId === user);
    default:
      return events;
  }
}

const mapStateToProps = (state, ownProps) => {
 return {
   userProfileDetails: state.profile.usersCollection.find(user => user.id === ownProps.match.params.id),
   currentUser: state.auth.currentUser && state.auth.currentUser.uid || null,
   pastEvents: eventSelector(state.events.events, 'past', state.auth.currentUser.uid),
   futureEvents: eventSelector(state.events.events, 'future', state.auth.currentUser.uid),
   hosting: eventSelector(state.events.events, 'hosting', state.auth.currentUser.uid)
 }
};

export default connect(mapStateToProps)(UserProfilePage);
