import React from 'react';
import { fromUnixTime, format } from 'date-fns';
import {
  DetailedUserHeaderContainer,
  DetailedUserHeaderImg,
  DetailedUserHeaderJoinDate,
} from '../../../app/styled/user/DetailedUser/DetailedUserHeader';
import DetailedUserEdit from './DetailedUserEdit';

const DetailedUserHeader = ({ userDetails }) => {
  let date = fromUnixTime(userDetails.joined.seconds);
  let parsedJoinDate = format(date, 'EEEE, do MMMM yyyy');
  return (
    <DetailedUserHeaderContainer>
      <div>
        <DetailedUserHeaderImg
          src={userDetails.photoURL || '/assets/profile.png'}
          alt='user'
        />
      </div>
      <div>
        <h4>{userDetails && userDetails.name}</h4>
        {userDetails.occupation && <h6>{userDetails.occupation}</h6>}
        {userDetails.homeCity && <h6>{userDetails.homeCity}</h6>}
        {userDetails.joined && (
          <DetailedUserHeaderJoinDate>
            Member since: {parsedJoinDate}
          </DetailedUserHeaderJoinDate>
        )}
      </div>
        <DetailedUserEdit />
    </DetailedUserHeaderContainer>
  );
};

export default DetailedUserHeader;
