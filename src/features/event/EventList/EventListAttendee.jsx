import React from 'react';
import {Image} from 'react-bootstrap';


const EventListAttendee = (props) => {
  return (
      <Image className='avatar-img mr-2' src={props.attendee.hostPhoto} roundedCircle alt='attendee' />
  )
}

export default EventListAttendee
