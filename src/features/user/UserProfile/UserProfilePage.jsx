import React from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import UserProfileHeader from './UserProfileHeader';
import UserProfileAbout from './UserProfileAbout';

const UserProfileContainer = styled(Container)`
  margin-top: 8rem;
`;

const UserProfileCard = styled.div`
  border-bottom: 1px solid #ddd;
  background: #ffffff;
  color: #222;
  padding: 2.5rem 3rem;
  margin-bottom: 2rem;
`;

class UserProfilePage extends React.Component {
  render() {
    const { userProfileDetails, currentUser } = this.props;
    return (
      <UserProfileContainer>
        <UserProfileCard>
          <UserProfileHeader
            currentUser={currentUser}
            userDetails={userProfileDetails}
          />
          <UserProfileAbout userDetails={userProfileDetails} />
        </UserProfileCard>
      </UserProfileContainer>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userProfileDetails: state.profile.usersCollection.find(
      (user) => user.id === ownProps.match.params.id
    ),
    currentUser: (state.auth.currentUser && state.auth.currentUser.uid) || null
  };
};

export default connect(mapStateToProps)(UserProfilePage);
