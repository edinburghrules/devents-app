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
        hostedBy: { hostId },
      },
      user,
    } = this.props;

    let isHost = hostId === user;
    let isGoing;

    for (const attendee in attendees) {
      if (attendee === user) {
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
              {cancelled && (
                <div className='event-cancelled'>
                  <span class='cross-icon' role='img' aria-label='cross icon'>
                    ❌
                  </span>
                  <span> Event Cancelled</span>
                </div>
              )}
            </Card.Subtitle>
            <Card.Text className='mt-4'>{snip}</Card.Text>
          </Card.Body>
          <Card.Body>
            <div className='event-info'>
              <div className='mr-2'>
                {
                  <React.Fragment>
                    <span role='img' aria-label='compass icon'>
                      🧭
                    </span>
                    <span> {venue}</span>
                  </React.Fragment>
                }
                <br />
              </div>
              <div>
                <span className={cancelled ? 'cancelled-date' : 'event-date'}>
                  {date.seconds && (
                    <React.Fragment>
                      <span role='img' aria-label='date icon'>
                        🗓
                      </span>
                      <span>
                        {format(
                          fromUnixTime(date.seconds),
                          ' EEEE, do MMMM yyyy'
                        )}
                      </span>
                    </React.Fragment>
                  )}
                </span>
                <br />
              </div>
            </div>
          </Card.Body>
          <Card.Body className='people-going'>
            <p>People going :</p>
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
        </Card>
      </a>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser.uid,
  };
};

export default connect(mapStateToProps)(withRouter(EventListItem));
