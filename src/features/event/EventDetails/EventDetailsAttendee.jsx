import React from 'react';

const EventDetailsAttendee = (props) => {
  return (
    <div className='attendee-card'>
      <img
        className='attendee-card-img'
        src={props.attendee.hostPhoto}
        alt='event attendee'
      />
      <span className='attendee-card-name'>{props.attendee.name}</span>
    </div>
  );
};

export default EventDetailsAttendee;
