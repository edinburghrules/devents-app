import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Image, Row, Col, Button } from 'react-bootstrap';
import { fromUnixTime, format } from 'date-fns';
import EventListAttendee from './EventDetailsAttendee';
import EventDetailsMap from './EventDetailsMap';
import EventDashboard from '../EventDashboard/EventDashboard';

class EventDetails extends Component {
  render() {
    if (this.props.event === undefined) return <EventDashboard />;

    const {
      event: {
        id,
        title,
        description,
        date,
        hostedBy: { name, hostPhoto, hostId },
        venue,
        img,
        cost,
        latlng,
        attendees,
        cancelled,
      },
      user,
    } = this.props;

    let parsedDate = fromUnixTime(date.seconds);
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
      <Fragment>
        <div className='event-details-top'>
          <Container className='event-dtls'>
            <div className='mb-2'>
              <h1 className='event-details-top-h1'>{title}</h1>
              <h3 className='event-details-top-h1'>
              {cancelled && (
                <React.Fragment>
                  <span role='img' aria-label='cross icon'>
                    ❌
                  </span>
                  <span> Event Cancelled</span>
                </React.Fragment>
              )}
              </h3>
              <div className='event-details-top-host'>
                <img src={hostPhoto && hostPhoto} alt='host' />
                <div>
                  <h5 className='event-details-top-h5'>Hosted by</h5>
                  <h6 className='event-details-top-h6'>{name && name}</h6>
                </div>
              </div>
            </div>
            <div className='mt-4'>
              {!isHost &&  (
                <Button disabled={cancelled} size='lg'>
                  {isGoing ? 'Cancel my place' : 'Book your place'}
                </Button>
              )}
              {isHost && (
                <Button
                  as={Link}
                  to={`/manageEvent/${id}`}
                  size='lg'
                  variant='info'
                  className='ml-2'
                >
                  Edit
                </Button>
              )}
            </div>
          </Container>
        </div>
        <Container className='event-details'>
          <Row>
            <Col>
              <div className='event-details-card'>
                <Image className='event-details-img' src={img && img} />
                <div className='event-details-info'>
                  <h3 className='event-details-heading'>Details</h3>
                  <p>{description}</p>
                </div>
                <div className='event-details-info'>
                  <h3 className='event-details-heading'>
                    {attendees && attendees.length} Attendees
                  </h3>
                  <div className='event-details-attendees'>
                    {attendees &&
                      Object.keys(attendees).map((attendee, index) => {
                        return (
                          <EventListAttendee
                            key={index}
                            attendee={attendees[attendee]}
                          />
                        );
                      })}
                  </div>
                </div>
              </div>
            </Col>
            <Col>
              <Container className='event-info-container'>
                <div className='event-info-panel'>
                  <h5 className='event-info-panel-heading'>Information</h5>
                  <div className='event-info-container-info'>
                    <span role='img' aria-label='date icon'>🗓</span>
                    <span className={cancelled ? 'cancelled-date ml-3' : 'event-date ml-3'}>
                      {date && format(parsedDate, ' EEEE, do MMMM yyyy')} at {' '}
                      {format(parsedDate, 'h:mm a')}
                    </span>
                  </div>
                  <div className='event-info-container-info'>
                    <span role='img' aria-label='location icon'>🧭</span>
                    <span className='ml-3 '>{venue && venue}</span>
                  </div>
                  <div className='event-info-container-info'>
                    <span role='img' aria-label='cost icon'>💰</span>
                    <span className='ml-3 '>{cost ? `£ ${cost}` : 'Free entry'}</span>
                  </div>
                </div>
                <div className='event-info-panel map'>
                  <EventDetailsMap latlng={latlng && latlng} />
                </div>
              </Container>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    event: state.events.find((event) => {
      return event.id.toString() === ownProps.match.params.id.toString();
    }),
    user: state.profile.userProfile.uid,
  };
};

export default connect(mapStateToProps)(EventDetails);
