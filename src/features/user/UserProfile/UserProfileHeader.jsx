import React from 'react';
import styled from 'styled-components';
import { fromUnixTime, format } from 'date-fns';
import UserProfileEdit from './UserProfileEdit';
import UserProfileFollow from './UserProfileFollow';

const UserProfileHeaderContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  align-items: flex-start;
`;

const UsersName = styled.h3`
  font-weight: 600;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
`;

const UserProfileHeaderImg = styled.img`
  margin-right: 2rem;
  border-radius: 50%;
  height: 7.5rem;
`;

const UserProfileHeaderJoinDate = styled.h6`
  color: #222;
  font-size: .9rem;
  margin-top: 1.1rem;
`;

const UserProfileHeader = ({ userDetails, currentUser }) => {
  let date = fromUnixTime(userDetails && userDetails.joined.seconds);
  let parsedJoinDate = format(date && date, 'EEEE, do MMMM yyyy');
  return (
    <UserProfileHeaderContainer>
      <div>
        <UserProfileHeaderImg
          src={(userDetails && userDetails.photoURL) || '/assets/profile.png'}
          alt='user'
        />
      </div>
      <div>
        <UsersName>{userDetails && userDetails.name}</UsersName>
        {userDetails.occupation && <h6>{userDetails.occupation}</h6>}
        {userDetails.homeCity && <h6>{userDetails.homeCity}</h6>}
        {userDetails.joined && (
          <UserProfileHeaderJoinDate>
            Member since: {parsedJoinDate}
          </UserProfileHeaderJoinDate>
        )}
      </div>
      {currentUser === null ? '' : currentUser === userDetails.uid ? (<UserProfileEdit/>) : (<UserProfileFollow/>)}
    </UserProfileHeaderContainer>
  );
};

export default UserProfileHeader;
