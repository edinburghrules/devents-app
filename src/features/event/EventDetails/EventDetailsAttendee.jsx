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
        src={props.attendee.hostPhoto}
        alt='event attendee'
      />
      <EventDetailsAttendeeCardName>{props.attendee.name}</EventDetailsAttendeeCardName>
    </EventDetailsAttendeeCard>
  );
};

export default EventDetailsAttendee;
