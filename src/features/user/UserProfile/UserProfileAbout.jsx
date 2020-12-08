import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import renderHTML from 'react-render-html';

const UserProfileAboutContainer = styled(Container)`
`;

const Heading = styled.h3`
  font-weight: 600;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  margin-top: 4rem;
`;

const UserProfileInterests = styled.div`
  margin: 2rem 0;
`;

const UserProfileAboutList = styled.ul`
  list-style: none;
  padding: 0;
  font-weight: 400;
  line-height: 2.2;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media(max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media(max-width: 767px) {
    grid-template-columns: 1fr;
  }
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
      {about !== '<p><br></p>' && (
        <React.Fragment>
          <Heading>About</Heading>
          {renderHTML(about)}
        </React.Fragment>
      )}
      {interests.length > 0 && (
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
