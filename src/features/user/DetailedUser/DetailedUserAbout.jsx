import React from 'react';
import { fromUnixTime, format } from 'date-fns';

const DetailedUserAbout = ({ userDetails }) => {
  let date = fromUnixTime(userDetails.joined.seconds);
  let parsedJoinDate = format(date, 'EEEE, do MMMM yyyy');
  return (
    <div className='detailed-user-about'>
      <div className='detailed-user-about-left'>
        {(userDetails.name && userDetails.about) && (<h6>About {userDetails.name}</h6>)}
        {userDetails.joined && (<h6>Member since: {parsedJoinDate}</h6>)}
        {<p>{userDetails.about && userDetails.about}</p>}
        <ul>
          {userDetails.interests && userDetails.interests.map((interest, index) => {
            return <li key={index}>{interest}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default DetailedUserAbout;
