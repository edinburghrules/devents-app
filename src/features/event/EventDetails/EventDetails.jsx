import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Container, Image, Row, Col, Button } from 'react-bootstrap';
import EventListAttendee from './EventDetailsAttendee';
import EventDetailsMap from './EventDetailsMap';

class EventDetails extends Component {

  render() {
    const {
      title,
      description,
      date,
      hostedBy: { name, hostPhoto },
      city,
      venue,
      img,
      snip,
      cost,
      latlng,
      attendees
    } = this.props.event;
    return (
      <Fragment>
        <div className='event-details-top'>
          <Container className='event-details-container'>
            <div>
              <h1 className='event-details-top-h1'>{title}</h1>
              <div className='event-details-top-host'>
                <img src={hostPhoto} alt='host' />
                <div>
                  <h5 className='event-details-top-h5'>Hosted by</h5>
                  <h6 className='event-details-top-h6'>{name}</h6>
                </div>
              </div>
            </div>
            <div>
              <Button size='lg'>Attend</Button>
            </div>
          </Container>
        </div>
        <Container className='event-details'>
          <Row>
            <Col lg={6}>
              <div className='event-details-card'>
                <Image className='event-details-img' src={img} />
                <div className='event-details-info'>
                  <h3 className='event-details-heading'>Details</h3>
                  <p>{snip}</p>
                  <p>{description}</p>
                </div>
                <div className='event-details-info'>
                  <h3 className='event-details-heading'>
                    {attendees && attendees.length} Attendees
                  </h3>
                  <div className='event-details-attendees'>
                    {attendees &&
                      attendees.map((attendee, index) => {
                        return <EventListAttendee key={index} attendee={attendee} />;
                      })}
                  </div>
                </div>
              </div>
            </Col>
            <Col md={true}>
              <Container className='event-info-container'>
                <div className='event-info-panel'>
                <h5 className='event-info-panel-heading'>Information</h5>
                  <div className='event-info-container-info'>
                    <img src='/assets/callg.png' alt='calednar icon' />
                    <span className='ml-3 '>{date}</span>
                  </div>
                  <div className='event-info-container-info'>
                    <img src='/assets/loclg.png' alt='location icon'/>
                    <span className='ml-3 '>
                      {venue}, {city}
                    </span>
                  </div>
                  <div className='event-info-container-info'>
                    <img src='/assets/pound.png' alt='cost icon' />
                    <span className='ml-3 '>{cost.toUpperCase()}</span>
                  </div>
                </div>
                <div className='event-info-panel map'>
                  <EventDetailsMap latlng={latlng}/>
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
    return event.id === Number(ownProps.match.params.id);
  });
  return {
    event
  };
};

export default connect(mapStateToProps)(EventDetails);
