import React from 'react';
import styled from 'styled-components';

const UserProfileAboutContainer = styled.div`
  margin: 2rem 0;
`;

const UserProfileInterests = styled.div`
  margin: 2rem 0;
`;

const UserProfileAboutList = styled.ul`
  list-style: none;
  padding: 0;
  font-weight: 400;
  line-height: 2.2;
  display: flex;
`;

const UserProfileAboutListItem = styled.li`
  color: #555;
  font-size: 0.9rem;
  margin-right: 1.5rem;
`;

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
