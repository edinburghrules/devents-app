import React from 'react';
import { fromUnixTime, format } from 'date-fns';

const DetailedUserAbout = ({ userDetails }) => {
  let date = fromUnixTime(userDetails.joined.seconds);
  let parsedJoinDate = format(date, 'EEEE, do MMMM yyyy');
  return (
    <div className='detailed-user-about'>
      <div className='detailed-user-about-left'>
        <h6>About {userDetails.name}</h6>
        <h6>Member since: {parsedJoinDate}</h6>
        <p>{userDetails.about || 'No information'}</p>
        <ul>
          {userDetails.interests.map((interest, index) => {
            return <li key={index}>{interest}</li>;
          }) || 'No information'}
        </ul>
      </div>
    </div>
  );
};

export default DetailedUserAbout;
