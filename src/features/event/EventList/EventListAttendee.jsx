import React from 'react';
import styled from 'styled-components';
import { Image } from 'react-bootstrap';

const EventListAttendeeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -1.5rem;
  margin-right: .4rem;
  margin-bottom: 2.5rem;
`;

const EventListAttendeeAvatarImage = styled(Image)`
  height: 1.5rem;
`;


const EventListAttendee = (props) => {
  const {
    attendee: { attendeePhoto },
  } = props;
  return (
    <React.Fragment>
      <EventListAttendeeContainer>
        <EventListAttendeeAvatarImage
          src={attendeePhoto || '/assets/profile.png'}
          roundedCircle
          alt='attendee'
        />
      </EventListAttendeeContainer>
    </React.Fragment>
  );
};

export default EventListAttendee;
