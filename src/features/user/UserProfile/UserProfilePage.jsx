import React from 'react';
import { connect } from 'react-redux';
import UserProfileHeader from './UserProfileHeader';
import UserProfileAbout from './UserProfileAbout';
import UserProfileEvents from './UserProfileEvents';
import {
  UserProfileContainer,
  UserProfileCard,
} from '../../../app/styled/user/UserProfile/UserProfile';

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

const mapStateToProps = (state, ownProps) => {
 return {
   userProfileDetails: state.profile.usersCollection.find(user => user.id === ownProps.match.params.id),
   currentUser: state.auth.currentUser && state.auth.currentUser.uid
 }
};

export default connect(mapStateToProps)(UserProfilePage);
