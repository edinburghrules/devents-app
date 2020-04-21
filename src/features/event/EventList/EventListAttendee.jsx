import React from 'react';
import {Image} from 'react-bootstrap';


const EventListAttendee = ({attendee}) => {
  const {photoURL} = attendee;
  return (
      <Image className='avatar-img mr-2' src={photoURL} roundedCircle alt='attendee' />
  )
}

export default EventListAttendee
