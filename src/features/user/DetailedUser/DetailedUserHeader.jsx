import React from 'react';
import { fromUnixTime, formatDistanceToNowStrict } from 'date-fns';

const DetailedUserHeader = ({ userDetails }) => {
  let parsedDob = userDetails.dob ? fromUnixTime(userDetails.dob.seconds) : new Date();
  let age = formatDistanceToNowStrict(parsedDob, []);
  return (
    <div className='detailed-user-header'>
      <div className='detailed-user-header-img-container'>
        <img src={userDetails.photoURL || '/assets/profile.png'} alt='user' />
      </div>
      <div className='detailed-user-header-info-container'>
        <h4>{userDetails && userDetails.name}</h4>
        {userDetails.occupation && (<h6>{userDetails.occupation}</h6>)}
        {userDetails.dob && (<h6>{age} old</h6>)}
        {userDetails.homeCity && (<h6>{userDetails.homeCity}</h6>)}
      </div>
    </div>
  );
};

export default DetailedUserHeader;
