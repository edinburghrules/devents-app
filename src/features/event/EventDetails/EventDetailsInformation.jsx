import React from 'react';
import styled from 'styled-components';
import { fromUnixTime, format } from 'date-fns';
import { Row, Col, Container } from 'react-bootstrap';
import EventDetailsAttendee from './EventDetailsAttendee';
import EventDetailsMap from './EventDetailsMap';

const EventDetailsInformationContainer = styled(Container)`
  margin-top: 6rem;
`;

const EventDetailsInformationCard = styled.div`
  text-align: left;
  background: #fff;
  box-shadow: 0 4px 2px -2px #e0e0e0;
  border-radius: 4px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const EventDetailsInformationCardHeading = styled.h3`
  font-weight: 600;
  font-size: 1.3rem;
  margin-bottom: 1.4rem;
  display: flex;
  align-items: center;
`;

const EventDetailsInformationTotalAttendees = styled.span`
  font-weight: 600;
  font-size: 0.8rem;
  margin-left: 0.4rem;
`;

const EventDetailsInformationAttendeesSection = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const EventDetailsInformationMap = styled.div`
  margin-top: 2rem;
  padding: 0;
`;


const EventDetailsInformationDate = styled.span`
  margin-left: .7rem;
  ${({ isCancelled }) => isCancelled && `
    text-decoration: line-through;
  `}
`;


const EventDetailsInformation = (props) => {
  const {
    event: { description, attendees, date, cancelled, venue, cost, coordinates }
  } = props;
  let parsedDate = fromUnixTime(date.seconds);
  let numberOfAttendees = Object.keys(attendees).length;
  const attendeesArr = Object.keys(attendees);
  const filteredAttendeesArr = [];
  attendeesArr.forEach(attendee => {
    if(attendees[attendee].hasOwnProperty('host')) {
      filteredAttendeesArr.unshift(attendees[attendee]);
    } else {
      filteredAttendeesArr.push(attendees[attendee]);
    }
  })
  console.log(filteredAttendeesArr);
  return (
    <EventDetailsInformationContainer>
      <Row>
        <Col>
          <EventDetailsInformationCard>
            <div>
              <EventDetailsInformationCardHeading>
                Details
              </EventDetailsInformationCardHeading>
              <p>{description}</p>
            </div>
          </EventDetailsInformationCard>
          <EventDetailsInformationCard>
            <div>
              <EventDetailsInformationCardHeading>
                {attendees && attendees.length} People going{' '}
                <EventDetailsInformationTotalAttendees>
                  ({numberOfAttendees})
                </EventDetailsInformationTotalAttendees>
              </EventDetailsInformationCardHeading>
              <EventDetailsInformationAttendeesSection>
                {attendees &&
                  filteredAttendeesArr.map((attendee, index) => {
                    return (
                      <EventDetailsAttendee
                        key={index}
                        host={attendee.host}
                        attendee={attendee}
                        attendeeId={attendee}
                      />
                    );
                  })}
              </EventDetailsInformationAttendeesSection>
            </div>
          </EventDetailsInformationCard>
        </Col>
        <Col>
          <EventDetailsInformationCard>
            <EventDetailsInformationCardHeading>
              Information
            </EventDetailsInformationCardHeading>
            <div>
              <span role='img' aria-label='date icon'>
                🗓
              </span>
              <EventDetailsInformationDate isCancelled={cancelled}>
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
              <EventDetailsMap latlng={coordinates && coordinates} />
            </EventDetailsInformationMap>
          </EventDetailsInformationCard>
        </Col>
      </Row>
    </EventDetailsInformationContainer>
  );
};

export default EventDetailsInformation;
