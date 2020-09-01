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

    for(const k in attendees) {
      if (k === user) {
        isGoing = true;
      } else {
        isGoing = false;
      }
    }

    return (
      <Fragment>
        <div className='event-details-top'>
          <Container className='event-dtls'>
            <div>
              <h1 className='event-details-top-h1'>{title}</h1>
              <h3 className='event-details-top-h1'>
                {cancelled && '❌ Event Cancelled ❌'}
              </h3>
              <div className='event-details-top-host'>
                <img src={hostPhoto && hostPhoto} alt='host' />
                <div>
                  <h5 className='event-details-top-h5'>Hosted by</h5>
                  <h6 className='event-details-top-h6'>{name && name}</h6>
                </div>
              </div>
            </div>
            <div>
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
                    <img src='/assets/cal.png' alt='calendar iconz' />
                    <span
                      className={cancelled ? 'cancelled-date' : 'event-date'}
                    >
                      {date && format(parsedDate, 'EEEE, do MMMM yyyy')} at{' '}
                      {format(parsedDate, 'h:mm a')}
                    </span>
                  </div>
                  <div className='event-info-container-info'>
                    <img src='/assets/loc.png' alt='location icon' />
                    <span className='ml-3 '>{venue}</span>
                  </div>
                  <div className='event-info-container-info'>
                    <img src='/assets/pound.png' alt='cost icon' />
                    <span className='ml-3 '>£{cost && cost}</span>
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
