import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Container, Image, Row, Col } from 'react-bootstrap';
import EventListAttendee from './EventDetailsAttendee';

class EventDetails extends Component {
  render() {
    const { title, description, hostedBy: {name, hostPhoto}, city, venue, img, snip, attendees } = this.props.event;
    return (
      <Fragment>
      <div className='event-details-top'>
        <Container>
          <h1 className='event-details-top-h1'>{title}</h1>
          <div className='event-details-top-host'>
            <img src={hostPhoto} alt='host'/>
            <div>
              <h5 className='event-details-top-h5'>Hosted by</h5>
              <h6 className='event-details-top-h6'>{name}</h6>
            </div>
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
                <h3 className='event-details-heading'>{attendees && attendees.length} Attendees</h3>
                <div className='event-details-attendees'>
                  {attendees && attendees.map(attendee => {
                    return (<EventListAttendee attendee={attendee}/>)
                  })}
                </div>
              </div>
            </div>
          </Col>
          <Col md={true}>

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
    event,
  };
};

export default connect(mapStateToProps)(EventDetails);
