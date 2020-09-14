import React from 'react';
import { fromUnixTime, format } from 'date-fns';
import {
  UserProfileHeaderContainer,
  UserProfileHeaderImg,
  UserProfileHeaderJoinDate,
} from '../../../app/styled/user/UserProfile/UserProfileHeader';
import UserProfileEdit from './UserProfileEdit';

const UserProfileHeader = ({ userDetails }) => {
  let date = fromUnixTime(userDetails.joined.seconds);
  let parsedJoinDate = format(date, 'EEEE, do MMMM yyyy');
  return (
    <UserProfileHeaderContainer>
      <div>
        <UserProfileHeaderImg
          src={userDetails.photoURL || '/assets/profile.png'}
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
        <UserProfileEdit />
    </UserProfileHeaderContainer>
  );
};

export default UserProfileHeader;
