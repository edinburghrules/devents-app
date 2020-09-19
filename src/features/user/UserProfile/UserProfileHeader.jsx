import React from 'react';
import { fromUnixTime, format } from 'date-fns';
import {
  UserProfileHeaderContainer,
  UserProfileHeaderImg,
  UserProfileHeaderJoinDate,
} from '../../../app/styled/user/UserProfile/UserProfileHeader';
import UserProfileEdit from './UserProfileEdit';
import UserProfileFollow from './UserProfileFollow';

const UserProfileHeader = ({ userDetails, currentUser }) => {
  let date = fromUnixTime(userDetails && userDetails.joined.seconds);
  let parsedJoinDate = format(date && date, 'EEEE, do MMMM yyyy');
  console.log(userDetails.uid, currentUser);
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
