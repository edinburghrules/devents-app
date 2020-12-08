import React from 'react';
import styled from 'styled-components';
import { fromUnixTime, format } from 'date-fns';
import renderHTML from 'react-render-html';
import { Container } from 'react-bootstrap';
import EventDetailsAttendee from './EventDetailsAttendee';
import EventDetailsMap from './EventDetailsMap';
import EventDetailsChat from './EventDetailsChat';

const EventDetailsInformationContainer = styled(Container)`
  border-top: 1px solid #ddd;
  padding-top: 4rem;
`;

const EventDetailsInformationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 30rem 15rem 15rem 15rem;

  @media (max-width: 992px) {
    grid-template-rows: repeat(5, auto);
  }
`;

const EventDetailsInformationCard = styled.div`
  text-align: left;
  background: #fff;
  margin-bottom: 4rem;

  @media (max-width: 992px) {
    margin-bottom: 1rem;
  }

  &#details {
    grid-column: 1/3;
  }

  @media (max-width: 992px) {
    &#details {
      grid-column: 1/5;
    }
  }

  &#info {
    grid-column: 3/5;
  }

  @media (max-width: 992px) {
    &#info {
      margin-top: 3rem;
      grid-column: 1/5;
      grid-row: 3/4;
    }
  }

  &#attendees {
    margin-top: 3rem;
    grid-column: 3/5;
    grid-row: 2/3;
  }

  @media (max-width: 992px) {
    &#attendees {
      grid-column: 1/5;
      grid-row: 5/6;
    }
  }

  &#chat {
    margin-top: 3rem;
    grid-column: 3/5;
    grid-row: 3/4;
  }

  @media (max-width: 992px) {
    &#chat {
      margin-top: 0;
      grid-column: 1/5;
      grid-row: 2/3;
    }
  }
`;

const EventDetailsImage = styled.img`
  width: 90%;
  height: 250px;
  object-fit: cover;
  object-position: center;
  margin-bottom: 2rem;
`;

const EventInformationInfo = styled.div`
  display: flex;
`;

const EventDetailsInformationCardHeading = styled.h3`
  font-weight: 600;
  font-size: 1.3rem;
  margin-bottom: 1rem;
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
  margin-left: 1rem;
  margin-bottom: 0.4rem;
  ${({ isCancelled }) =>
    isCancelled &&
    `
    text-decoration: line-through;
  `}
`;

const EventDetailsInformation = (props) => {
  const {
    event: {
      id,
      description,
      attendees,
      date,
      cancelled,
      venue,
      cost,
      coordinates,
      photo: { photoURL },
    },
    user,
    currentUser,
  } = props;

  let parsedDate = fromUnixTime(date.seconds);
  let numberOfAttendees = Object.keys(attendees).length;
  const attendeesArr = Object.keys(attendees);
  const filteredAttendeesArr = [];

  attendeesArr.forEach((attendee) => {
    if (attendees[attendee].hasOwnProperty('host')) {
      filteredAttendeesArr.unshift({ ...attendees[attendee], id: attendee });
    } else {
      filteredAttendeesArr.push({ ...attendees[attendee], id: attendee });
    }
  });

  return (
    <EventDetailsInformationContainer>
      <EventDetailsInformationGrid>
        <EventDetailsInformationCard id='details'>
          <EventDetailsInformationCardHeading>
            Details
          </EventDetailsInformationCardHeading>
          <EventDetailsImage src={photoURL && photoURL} alt='event' />
          <div style={{ width: '90%' }}>{renderHTML(description)}</div>
        </EventDetailsInformationCard>
        <EventDetailsInformationCard id='attendees'>
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
                      user={user}
                      key={index}
                      attendee={attendee}
                    />
                  );
                })}
            </EventDetailsInformationAttendeesSection>
          </div>
        </EventDetailsInformationCard>
        <EventDetailsInformationCard id='info'>
          <EventDetailsInformationCardHeading>
            Information
          </EventDetailsInformationCardHeading>
          <EventInformationInfo>
            <span role='img' aria-label='date icon'>
              🗓
            </span>
            <EventDetailsInformationDate isCancelled={cancelled}>
              {date && format(parsedDate, ' EEEE, do MMMM yyyy')} at{' '}
              {format(parsedDate, 'h:mm a')}
            </EventDetailsInformationDate>
          </EventInformationInfo>
          <EventInformationInfo>
            <span role='img' aria-label='location icon'>
              🧭
            </span>
            <span className='ml-3 mb-1 '>{venue && venue}</span>
          </EventInformationInfo>
          <EventInformationInfo>
            <span role='img' aria-label='cost icon'>
              💰
            </span>
            <span className='ml-3 mb-1 '>
              {cost ? `£ ${cost}` : 'Free entry'}
            </span>
          </EventInformationInfo>
          <EventDetailsInformationMap>
            <EventDetailsMap latlng={coordinates && coordinates} />
          </EventDetailsInformationMap>
        </EventDetailsInformationCard>
        <EventDetailsInformationCard id='chat'>
          {user && <EventDetailsChat eventId={id} currentUser={currentUser} />}
        </EventDetailsInformationCard>
      </EventDetailsInformationGrid>
    </EventDetailsInformationContainer>
  );
};

export default EventDetailsInformation;
