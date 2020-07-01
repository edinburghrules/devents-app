import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Image, Row, Col, Button } from 'react-bootstrap';
import {fromUnixTime, format} from 'date-fns';
import EventListAttendee from './EventDetailsAttendee';
import EventDetailsMap from './EventDetailsMap';

class EventDetails extends Component {
  render() {
    const {
      id,
      title,
      description,
      date,
      hostedBy: { name, hostPhoto },
      venue,
      img,
      cost,
      latlng,
      attendees,
    } = this.props.event;

    let parsedDate = fromUnixTime(date.seconds)

    return (
      <Fragment>
        <div className='event-details-top'>
          <Container className='event-details-container'>
            <div>
              <h1 className='event-details-top-h1'>{title}</h1>
              <div className='event-details-top-host'>
                <img src={hostPhoto && hostPhoto} alt='host' />
                <div>
                  <h5 className='event-details-top-h5'>Hosted by</h5>
                  <h6 className='event-details-top-h6'>{name && name}</h6>
                </div>
              </div>
            </div>
            <div>
              <Button size='lg'>Attend</Button>
              <Button 
                as={Link}
                to={`/manageEvent/${id}`}
                size='lg'
                variant='info'
                className='ml-2'
              >
              Edit
              </Button>
            </div>
          </Container>
        </div>
        <Container className='event-details'>
          <Row>
            <Col lg={4}>
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
                      attendees.map((attendee, index) => {
                        return (
                          <EventListAttendee key={index} attendee={attendee} />
                        );
                      })}
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={8}>
              <Container className='event-info-container'>
                <div className='event-info-panel'>
                  <h5 className='event-info-panel-heading'>Information</h5>
                  <div className='event-info-container-info'>
                    <img src='/assets/cal.png' alt='calendar iconz' />
                    <span className='ml-3 '>{date && format(parsedDate, 'EEEE, do MMMM yyyy')} at {format(parsedDate, 'h:mm a')}</span>
                  </div>
                  <div className='event-info-container-info'>
                    <img src='/assets/loc.png' alt='location icon' />
                    <span className='ml-3 '>
                      {venue}
                    </span>
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
  let event = state.events.find((event) => {
    return event.id.toString() === ownProps.match.params.id.toString();
  });
  return {event}
}


export default connect(mapStateToProps)(EventDetails);
