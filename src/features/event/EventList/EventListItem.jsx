import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EventListAttendee from './EventListAttendee';

class EventListItem extends Component {
  render() {
    const {
      id,
      title,
      date,
      city,
      venue,
      hostedBy: {name},
      snip,
      img,
    } = this.props.event;
    return (
      <Link to={`/event/${id}`} className='card-link'>
        <Card className='p-4' style={{ width: '70%' }} border='light'>
          <Card.Body>
            <img
              alt='logo'
              className='rounded'
              style={{ width: '15%' }}
              src={img}
            />
            <Card.Text>
            </Card.Text>
            <Card.Title className='card-title mt-5'>{title}</Card.Title>
            <Card.Text className='mt-4'>{snip}</Card.Text>
          </Card.Body>
          <Card.Body>
          <div className='event-info'>
                <div className='mr-2 mb-3'>
                  <img
                    className='mr-2'
                    src='/assets/loc.png'
                    alt='location icon'
                  />
                  <span>
                    {venue}, {city}
                  </span>
                  <br />
                </div>
                <div className='mr-2 mb-3'>
                  <img
                    className='mr-2'
                    src='/assets/cal.png'
                    alt='location icon'
                  />
                  <span>{date.toString()}</span> <br />
                </div>
                <div className='mr-2 mb-3'>
                  <img
                    className='mr-2'
                    src='/assets/host.png'
                    alt='location icon'
                  />
                  <span>{name}</span> <br />
                </div>
              </div>
            </Card.Body>
          <Card.Body className='people-going'>
            <p>People going</p>
            <EventListAttendee />
          </Card.Body>
        </Card>
      </Link>
    );
  }
}

export default EventListItem;
