import React from 'react';
import {
  UserProfileAboutContainer,
  UserProfileAboutList,
  UserProfileInterests,
  UserProfileAboutListItem,
} from '../../../app/styled/user/UserProfile/UserProfileAbout';

const UserProfileAbout = ({ userDetails }) => {
  return (
    <UserProfileAboutContainer>
      <h5 className='mb-3'>About</h5>
      {<p>{userDetails.about && userDetails.about}</p>}
      <UserProfileInterests>
          <h5 className='mb-3'>Interests</h5>
          <UserProfileAboutList>
          {userDetails.interests &&
            userDetails.interests.map((interest, index) => {
              return (
                <UserProfileAboutListItem key={index}>
                  <span className='mr-1' role='img' aria-labelledby='tick icon'>
                    ✅
                  </span>
                  {interest}
                </UserProfileAboutListItem>
              );
            })}
            </UserProfileAboutList>
        </UserProfileInterests>
    </UserProfileAboutContainer>
  );
};

export default UserProfileAbout;
