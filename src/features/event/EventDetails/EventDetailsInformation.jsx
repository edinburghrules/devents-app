import React from 'react';
import { fromUnixTime, format } from 'date-fns';
import { Container, Image, Row, Col } from 'react-bootstrap';
import EventListAttendee from './EventDetailsAttendee';
import EventDetailsMap from './EventDetailsMap';

const EventDetailsInformation = (props) => {
  const {
    img,
    description,
    attendees,
    date,
    cancelled,
    venue,
    cost,
    latlng
  } = props.event;
  let parsedDate = fromUnixTime(date.seconds);
  return (
    <Container className='event-details-information'>
      <Row>
        <Col>
          <div className='event-details-card'>
            <Image className='event-details-img' src={img && img} />
            <div className='event-details-info'>
              <h3 className='event-details-heading'>Details</h3>
              <p>{description}</p>
            </div>
            <div className='event-details-info __people-going'>
              <h3 className='event-details-heading'>
                {attendees && attendees.length} People going
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
          <div className='event-info-panel'>
            <h5 className='event-info-panel-heading'>Information</h5>
            <div className='event-info-container-info'>
              <span role='img' aria-label='date icon'>
                🗓
              </span>
              <span
                className={
                  cancelled ? 'cancelled-date ml-3' : 'event-date ml-3'
                }
              >
                {date && format(parsedDate, ' EEEE, do MMMM yyyy')} at{' '}
                {format(parsedDate, 'h:mm a')}
              </span>
            </div>
            <div className='event-info-container-info'>
              <span role='img' aria-label='location icon'>
                🧭
              </span>
              <span className='ml-3 '>{venue && venue}</span>
            </div>
            <div className='event-info-container-info'>
              <span role='img' aria-label='cost icon'>
                💰
              </span>
              <span className='ml-3 '>{cost ? `£ ${cost}` : 'Free entry'}</span>
            </div>
            <div className='map'>
              <EventDetailsMap latlng={latlng && latlng} />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EventDetailsInformation;
