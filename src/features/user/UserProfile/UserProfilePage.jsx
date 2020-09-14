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
    const { userDetails } = this.props;
    return (
      <UserProfileContainer>
        <UserProfileCard>
          <UserProfileHeader userDetails={userDetails} />
          <UserProfileAbout userDetails={userDetails} />
          <UserProfileEvents />
        </UserProfileCard>
      </UserProfileContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  userDetails: state.profile.userProfile,
});

export default connect(mapStateToProps)(UserProfilePage);
