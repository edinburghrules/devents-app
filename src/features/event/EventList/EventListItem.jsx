import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    const {
      event: {
        title,
        date,
        venue,
        snip,
        img,
        attendees,
        cancelled,
        hostedBy: { hostId }
      },
      user
    } = this.props;

    let isHost = hostId === user;
    let isGoing;

    for (const k in attendees) {
      if (k === user) {
        isGoing = true;
      } else {
        isGoing = false;
      }
    }

    return (
      <a onClick={this.handleClick} href='/#' className='card-link'>
        <Card className='p-2' border='light'>
          <Card.Body>
            <div className='card-top'>
              <img
                alt='logo'
                className='rounded'
                style={{ width: '15%' }}
                src={img}
              />
              {!isHost && (
                <Button disabled={cancelled} onClick={this.attend}>
                  {isGoing ? 'Cancel your place' : 'Book your place'}
              </Button>
              )}

            </div>
            <Card.Title className='card-title mt-5'>{title}</Card.Title>
            <Card.Subtitle>
              {cancelled && '❌ EVENT CANCELLED ❌'}
            </Card.Subtitle>
            <Card.Text className='mt-4'>{snip}</Card.Text>
          </Card.Body>
          <Card.Body className='people-going'>
            <p>Attendees</p>
            {attendees &&
              Object.keys(attendees).map((attendee, index) => {
                return (
                  <EventListAttendee
                    key={index}
                    attendee={attendees[attendee]}
                  />
                );
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
                <span className={cancelled ? 'cancelled-date' : 'event-date'}>
                  {date.seconds &&
                    format(
                      fromUnixTime(date.seconds),
                      'EEEE, do MMMM yyyy'
                    )}{' '}
                </span>{' '}
                <br />
              </div>
            </div>
          </Card.Body>
        </Card>
      </a>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.profile.userProfile.uid
  }
}

export default connect()(withRouter(EventListItem));
