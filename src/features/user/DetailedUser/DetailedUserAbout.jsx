import React from 'react';
import {
  DetailedUserAboutContainer,
  DetailedUserAboutList,
  DetailedUserInterests,
  DetailedUserAboutListItem,
} from '../../../app/styled/user/DetailedUser/DetailedUserAbout';

const DetailedUserAbout = ({ userDetails }) => {
  return (
    <DetailedUserAboutContainer>
      <h5 className='mb-3'>About</h5>
      {<p>{userDetails.about && userDetails.about}</p>}
      <DetailedUserInterests>
          <h5 className='mb-3'>Interests</h5>
          <DetailedUserAboutList>
          {userDetails.interests &&
            userDetails.interests.map((interest, index) => {
              return (
                <DetailedUserAboutListItem key={index}>
                  <span className='mr-1' role='img' aria-labelledby='tick icon'>
                    ✅
                  </span>
                  {interest}
                </DetailedUserAboutListItem>
              );
            })}
            </DetailedUserAboutList>
        </DetailedUserInterests>
    </DetailedUserAboutContainer>
  );
};

export default DetailedUserAbout;
