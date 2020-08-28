import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import EventListAttendee from './EventListAttendee';
import { fromUnixTime, format } from 'date-fns';
import { withRouter } from 'react-router-dom';

class EventListItem extends Component {
  handleClick = (e) => {
    e.preventDefault();
    this.props.history.push(`/event/${this.props.event.id}`);
  };

  attend = (e) => {
    e.stopPropagation();
    alert('You are attending');
  };

  render() {
    const { title, date, venue, snip, img, attendees } = this.props.event;

    return (
      <a onClick={this.handleClick} href='/#' className='card-link'>
        <Card className='p-2' style={{ width: '70%' }} border='light'>
          <Card.Body>
            <div className='card-top'>
              <img
                alt='logo'
                className='rounded'
                style={{ width: '15%' }}
                src={img}
              />
              <Button onClick={this.attend}>Attend</Button>
            </div>
            <Card.Title className='card-title mt-5'>{title}</Card.Title>
            <Card.Text className='mt-4'>{snip}</Card.Text>
          </Card.Body>
          <Card.Body className='people-going'>
            <p>Attendees</p>
            {attendees &&
              Object.keys(attendees).map((attendee, index) => {
                return <EventListAttendee key={index} attendee={attendees[attendee]} />;
              })}
          </Card.Body>
          <Card.Body>
            <div className='event-info'>
              <div className='mr-2'>
                <img
                  className='mr-2'
                  src='/assets/loc.png'
                  alt='location icon'
                />
                <span>{venue}</span>
                <br />
              </div>
              <div>
                <img
                  className='mr-2 ml-3'
                  src='/assets/cal.png'
                  alt='location icon'
                />
                <span>{date.seconds && format(fromUnixTime(date.seconds), 'EEEE, do MMMM yyyy')} </span> <br/>
              </div>
            </div>
          </Card.Body>
        </Card>
      </a>
    );
  }
}

export default withRouter(EventListItem);
