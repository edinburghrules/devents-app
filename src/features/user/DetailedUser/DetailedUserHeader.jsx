import React from 'react';
import { fromUnixTime, formatDistanceToNowStrict } from 'date-fns';

const DetailedUserHeader = ({ userDetails }) => {
  let parsedDob = fromUnixTime(userDetails.dob.seconds);
  let age = formatDistanceToNowStrict(parsedDob, []);
  return (
    <div className='detailed-user-header'>
      <div className='detailed-user-header-img-container'>
        <img src={userDetails.photoURL || '/assets/profile.png'} alt='user' />
      </div>
      <div className='detailed-user-header-info-container'>
        <h4>{userDetails.name}</h4>
        <h6>{userDetails.occupation || 'No information'}</h6>
        <h6>{age} old</h6>
        <h6>{userDetails.homeCity || 'No information'}</h6>
      </div>
    </div>
  );
};

export default DetailedUserHeader;
