import React from 'react';
import styled from 'styled-components';
import { fromUnixTime, format } from 'date-fns';
import UserProfileEdit from './UserProfileEdit';
import UserProfileFollow from './UserProfileFollow';

const UserProfileHeaderContainer = styled.div`
  display: flex;
  margin-bottom: 3rem;
  align-items: flex-start;
`;

const UserProfileHeaderImg = styled.img`
  margin-right: 2rem;
  border-radius: 50%;
  height: 7.5rem;
`;

const UserProfileHeaderJoinDate = styled.h6`
  color: #1769FF;
  font-size: .9rem;
  margin-top: 1.1rem;
`;

const UserProfileHeader = ({ userDetails, currentUser }) => {
  console.log(userDetails)
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
        <h4>{userDetails && userDetails.name}</h4>
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
