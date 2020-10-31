import React from 'react';
import styled from 'styled-components';

const UserProfileEventsContainer = styled.div`

`;

const UsersEventsHeading = styled.h3`
  font-weight: 600;
  font-size: 1.3rem;
  margin-bottom: 1.4rem;
  display: flex;
  align-items: center;
`;

const DetailedUserEvents = () => {
  return (
    <UserProfileEventsContainer>
      <UsersEventsHeading>Events</UsersEventsHeading>
    </UserProfileEventsContainer>
  );
};

export default DetailedUserEvents;
