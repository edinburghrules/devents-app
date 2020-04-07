import React from 'react'

const EventDetailsAttendee = (props) => {
  const {photoURL, firstName, lastName} = props.attendee;
  return (
    <div className='attendee-card'>
      <img className='attendee-card-img' src={photoURL} alt='event attendee'/>
      <span className='attendee-card-name'>{firstName} <br/> {lastName}</span>
    </div>
  )
}

export default EventDetailsAttendee;
