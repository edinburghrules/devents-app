import React from 'react';
import { Link } from 'react-router-dom';
import {
  EventDetailsAttendeeCard,
  EventDetailsAttendeeCardImage,
  EventDetailsAttendeeCardName
} from '../../../app/styled/event/EventDetails/EventDetailsAttendee';

const EventDetailsAttendee = (props) => {
  const {attendee: {attendeePhoto, name}} = props;
  return (
    <EventDetailsAttendeeCard as={Link} to={`/`}>
      <EventDetailsAttendeeCardImage
        src={attendeePhoto || '/assets/profile.png'}
        alt='event attendee'
      />
      <EventDetailsAttendeeCardName>{name}</EventDetailsAttendeeCardName>
    </EventDetailsAttendeeCard>
  );
};

export default EventDetailsAttendee;
