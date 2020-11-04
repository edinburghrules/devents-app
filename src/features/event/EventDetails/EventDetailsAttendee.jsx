import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const EventDetailsAttendeeCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #222;
  padding: 0.4rem 0;

  &:hover {
    text-decoration: none;
    color: #222;
  }
`;

const EventDetailsAttendeeCardImage = styled.img`
  height: 40px;
  border-radius: 50%;
`;

const EventDetailsAttendeeCardName = styled.span`
  margin-top: 0.5rem;
  font-size: 0.7rem;
  text-align: center;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  width: 60%;
  justify-content: center;
  align-items: center;
`;

const Host = styled.p`
  font-size: 0.7rem;
`;

const Guest = styled.p`
  font-size: 0.7rem;
`;

const EventDetailsAttendee = (props) => {
  const {
    attendee: { attendeePhoto, name, host, id },
  } = props;

  return (
    <EventDetailsAttendeeCard as={Link} to={`/user-profile/${id}`}>
      <EventDetailsAttendeeCardImage
        src={ attendeePhoto ? attendeePhoto : '/assets/profile.png'}
        alt='event attendee'
      />
      <EventDetailsAttendeeCardName>{name}</EventDetailsAttendeeCardName>
      {host ? <Host>Host</Host> : <Guest>Guest</Guest>}
    </EventDetailsAttendeeCard>
  );
};

export default EventDetailsAttendee;
