import React from 'react';
import {
  EventListAttendeeAvatarImage,
  EventListAttendeeContainer,
} from '../../../app/styled/event/EventList/EventListAttendee';

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
