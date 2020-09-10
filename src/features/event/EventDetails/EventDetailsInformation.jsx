import React from 'react';
import { fromUnixTime, format } from 'date-fns';
import { Row, Col } from 'react-bootstrap';
import EventListAttendee from './EventDetailsAttendee';
import EventDetailsMap from './EventDetailsMap';
import {
  EventDetailsInformationContainer,
  EventDetailsInformationCard,
  EventDetailsInformationCardHeading,
  EventDetailsInformationTotalAttendees,
  EventDetailsInformationAttendeesSection,
  EventDetailsInformationDate,
  EventDetailsInformationMap
} from '../../../app/styled/event/EventDetails/EventDetailsInformation';

const EventDetailsInformation = (props) => {
  const {
    event: {
      description,
      attendees,
      date,
      cancelled,
      venue,
      cost,
      latlng
    },
    isHost
  } = props;
  let parsedDate = fromUnixTime(date.seconds);
  let numberOfAttendees = Object.keys(attendees).length;
  return (
    <EventDetailsInformationContainer>
      <Row>
        <Col>
          <EventDetailsInformationCard>
            <div>
              <EventDetailsInformationCardHeading>Details</EventDetailsInformationCardHeading>
              <p>{description}</p>
            </div>
          </EventDetailsInformationCard>
          <EventDetailsInformationCard>
            <div>
              <EventDetailsInformationCardHeading>
                {attendees && attendees.length} People going{' '}
                <EventDetailsInformationTotalAttendees>({numberOfAttendees})</EventDetailsInformationTotalAttendees>
              </EventDetailsInformationCardHeading>
              <EventDetailsInformationAttendeesSection>
                {attendees &&
                  Object.keys(attendees).map((attendee, index) => {
                    return (
                      <EventListAttendee
                        key={index}
                        isHost={isHost}
                        attendee={attendees[attendee]}
                      />
                    );
                  })}
              </EventDetailsInformationAttendeesSection>
            </div>
          </EventDetailsInformationCard>
        </Col>
        <Col>
          <EventDetailsInformationCard>
            <EventDetailsInformationCardHeading>Information</EventDetailsInformationCardHeading>
            <div>
              <span role='img' aria-label='date icon'>
                🗓
              </span>
              <EventDetailsInformationDate
                isCancelled={cancelled}
              >
                {date && format(parsedDate, ' EEEE, do MMMM yyyy')} at{' '}
                {format(parsedDate, 'h:mm a')}
              </EventDetailsInformationDate>
            </div>
            <div>
              <span role='img' aria-label='location icon'>
                🧭
              </span>
              <span className='ml-3 '>{venue && venue}</span>
            </div>
            <div>
              <span role='img' aria-label='cost icon'>
                💰
              </span>
              <span className='ml-3 '>{cost ? `£ ${cost}` : 'Free entry'}</span>
            </div>
            <EventDetailsInformationMap>
              <EventDetailsMap latlng={latlng && latlng} />
            </EventDetailsInformationMap>
          </EventDetailsInformationCard>
        </Col>
      </Row>
    </EventDetailsInformationContainer>
  );
};

export default EventDetailsInformation;
