import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const EventDetailsAttendeeCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #222;
  padding: .4rem 0;
  
  &:hover {
    text-decoration: none;
    color: #222;
  }
`;

const EventDetailsAttendeeCardImage = styled.img`
  height: 30px;
  border-radius: 50%;
`;

const EventDetailsAttendeeCardName = styled.span`
  margin-top: 0.5rem;
  font-size: 0.7rem;
  text-align: center;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  width: 60%;
  justify-content: center;
  align-items: center;
`;


const EventDetailsAttendee = (props) => {
  const {
    attendee: { attendeePhoto, name },
    attendeeId
  } = props;

  return (
    <EventDetailsAttendeeCard as={Link} to={`/user-profile/${attendeeId}`}>
      <EventDetailsAttendeeCardImage
        src={attendeePhoto || '/assets/profile.png'}
        alt='event attendee'
      />
      <EventDetailsAttendeeCardName>{name}</EventDetailsAttendeeCardName>
    </EventDetailsAttendeeCard>
  );
};

export default EventDetailsAttendee;
