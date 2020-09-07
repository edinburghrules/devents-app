import React from 'react';
import {
  EventListAttendeeAvatarImage,
  EventListAttendeeContainer,
  EventListAttendeeName,
} from '../../../app/styled/event/EventList/EventListAttendee';

const EventListAttendee = (props) => {
  const {
    attendee: { hostPhoto, name },
  } = props;
  return (
    <React.Fragment>
      <EventListAttendeeContainer>
        <EventListAttendeeAvatarImage
          src={hostPhoto}
          roundedCircle
          alt='attendee'
        />
        <EventListAttendeeName>{name}</EventListAttendeeName>
      </EventListAttendeeContainer>
    </React.Fragment>
  );
};

export default EventListAttendee;
