import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';
import EventListAttendee from './EventListAttendee';
import { fromUnixTime, format } from 'date-fns';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const EventListItemCardLink = styled.a`
  text-decoration: none !important;
`;

const EventListItemCard = styled.div`
  border-bottom: 1px solid #ddd;
  color: #222;
  margin-bottom: 2rem;
`;

const EventListItemContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 2rem;
`;

const EventListItemImageContainer = styled.div`
  margin-right: 2rem;
  width: 50%;
`;

const EventListItemImage = styled.img`
  width: 90%;
  height: 250px;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const EventListItemInformation = styled.div`
  width: 50%;
`;

const EventListItemCardTitle = styled(Card.Title)`
  font-size: 1.4rem !important;
  font-weight: 600 !important;
  margin-top: 1.5rem !important;
`;

const EventListItemCardEventInfo = styled.div`
  margin-top: -2.5rem;
  font-size: 0.8rem;
  letter-spacing: 0.3px;
  font-weight: 400;
  color: #555;
  display: flex;
  flex-direction: column;
`;

const EventListCardPeopleGoingHeading = styled(Card.Body)`
  font-size: 0.8rem;
  font-weight: 400;
  padding: 0;
  color: #555;
`;

const EventListItemCardPeopleGoing = styled(Card.Body)`
  font-size: 0.8rem;
  font-weight: 400;
  display: flex;
  align-items: flex-start;
  color: #555;
`;

const EventListItemCardCancelledTextContainer = styled.div`
  display: flex;
  align-items: center;
`;

const EventInformationInfo = styled.div`
  display: flex;
  margin-bottom: -.5rem;
`;

const EventListItemCardCancelledIcon = styled.span.attrs({
  role: 'img',
  ariaLabel: 'event cancelled icon',
})`
  font-size: 0.65rem;
  margin-right: 0.3rem;
`;

const EventListItemCardDate = styled.span`
  ${({ isCancelled }) =>
    isCancelled &&
    `
    text-decoration: line-through;
  `}
`;

class EventListItem extends Component {
  handleClick = (e) => {
    e.preventDefault();
    this.props.history.push(`/event/${this.props.event.id}`);
  };

  render() {
    const {
      event: {
        title,
        date,
        venue,
        snip,
        attendees,
        cancelled,
        photo: { photoURL },
      },
    } = this.props;

    const totalAttendees = Object.entries(attendees).length;

    return (
      <EventListItemCardLink onClick={this.handleClick} href='/#'>
        <EventListItemCard className='p-2' border='light'>
          <EventListItemContent>
            <EventListItemImageContainer>
              <EventListItemImage src={photoURL && photoURL} />
            </EventListItemImageContainer>
            <EventListItemInformation>
              <Card.Body>
                <EventListItemCardTitle className='card-title mt-5'>
                  {title}
                </EventListItemCardTitle>
                <Card.Subtitle>
                  {cancelled && (
                    <EventListItemCardCancelledTextContainer>
                      <EventListItemCardCancelledIcon>
                        {/* eslint-disable-next-line */}❌
                      </EventListItemCardCancelledIcon>
                      <span> Event Cancelled</span>
                    </EventListItemCardCancelledTextContainer>
                  )}
                </Card.Subtitle>
                <Card.Text className='mt-4'>{snip}</Card.Text>
              </Card.Body>
              <Card.Body>
                <EventListItemCardEventInfo>
                  <div className='mr-2'>
                    {
                      <EventInformationInfo>
                        <span role='img' aria-label='compass icon'>
                          🧭
                        </span>
                        <span className='ml-2'> {venue}</span>
                      </EventInformationInfo>
                    }
                    <br />
                  </div>
                  <div>
                    {date.seconds && (
                      <EventInformationInfo>
                        <span className='mr-2' role='img' aria-label='date icon'>
                          🗓
                        </span>
                        <EventListItemCardDate isCancelled={cancelled}>
                          {format(
                            fromUnixTime(date.seconds),
                            ' EEEE, do MMMM yyyy'
                          )}
                        </EventListItemCardDate>
                      </EventInformationInfo>
                    )}
                  </div>
                </EventListItemCardEventInfo>
              </Card.Body>
              <Card.Body>
                <EventListCardPeopleGoingHeading>
                  People going: {totalAttendees}
                </EventListCardPeopleGoingHeading>
              </Card.Body>
              <EventListItemCardPeopleGoing>
                {attendees &&
                  Object.keys(attendees).map((attendee, index) => {
                    return (
                      <EventListAttendee
                        key={attendee}
                        attendee={attendees[attendee]}
                      />
                    );
                  })}
              </EventListItemCardPeopleGoing>
            </EventListItemInformation>
          </EventListItemContent>
        </EventListItemCard>
      </EventListItemCardLink>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.currentUser !== null && state.auth.currentUser.uid,
  };
};

export default connect(mapStateToProps)(withRouter(EventListItem));
