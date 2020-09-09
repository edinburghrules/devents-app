import React from 'react';
import {
  EventDetailsAttendeeCard,
  EventDetailsAttendeeCardImage,
  EventDetailsAttendeeCardName
} from '../../../app/styled/event/EventDetails/EventDetailsAttendee';

const EventDetailsAttendee = (props) => {
  return (
    <EventDetailsAttendeeCard>
      <EventDetailsAttendeeCardImage
        src={props.attendee.attendeePhoto || '/assets/profile.png'}
        alt='event attendee'
      />
      <EventDetailsAttendeeCardName>{props.attendee.name}</EventDetailsAttendeeCardName>
    </EventDetailsAttendeeCard>
  );
};

export default EventDetailsAttendee;
