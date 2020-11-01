import React from 'react';
import styled from 'styled-components';

const UserProfileAboutContainer = styled.div`
  margin-top: 2rem;
`;

const Heading = styled.h3`
  font-weight: 600;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
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

const UserProfileAbout = (props) => {
  const { about, interests } = props.userDetails;
  return (
    <UserProfileAboutContainer>
      {about && (
        <React.Fragment>
          <Heading>About</Heading>
          <p>{about}</p>
        </React.Fragment>
      )}
      {interests && (
        <UserProfileInterests>
          <Heading>Interests</Heading>
          <UserProfileAboutList>
            {interests &&
              interests.map((interest, index) => {
                return (
                  <UserProfileAboutListItem key={index}>
                    <span
                      className='mr-1'
                      role='img'
                      aria-labelledby='tick icon'
                    >
                      ✅
                    </span>
                    {interest}
                  </UserProfileAboutListItem>
                );
              })}
          </UserProfileAboutList>
        </UserProfileInterests>
      )}
    </UserProfileAboutContainer>
  );
};

export default UserProfileAbout;
