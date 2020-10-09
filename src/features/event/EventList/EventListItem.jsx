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

const EventListItemCard = styled(Card)`
  box-shadow: 0px 2px 2px 2px #e0e0e0 !important;
  border-radius: 10px !important;
  color: #222;
  margin-bottom: 3rem;
`;

const EventListItemCardTitle = styled(Card.Title)`
  font-size: 1.6rem !important;
  font-weight: 600 !important;
  margin-top: 1.5rem !important;
`;

const EventListItemCardBookButton = styled(Card.Body)`
  margin-top: 0.5rem;
  display: flex;
  justify-content: flex-start;
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
  font-size: .8rem;
  font-weight: 600;
  padding: 0;
  margin-top: -1rem;
`;

const EventListItemCardPeopleGoing = styled(Card.Body)`
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: flex-start;
`;

const EventListItemCardCancelledTextContainer = styled.div`
  display: flex;
  align-items: center;
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
      event: { title, date, venue, snip, attendees, cancelled },
    } = this.props;

    const totalAttendees = Object.entries(attendees).length;

    return (
      <EventListItemCardLink onClick={this.handleClick} href='/#'>
        <EventListItemCard className='p-2' border='light'>
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
                  <React.Fragment>
                    <span role='img' aria-label='compass icon'>
                      🧭
                    </span>
                    <span> {venue}</span>
                  </React.Fragment>
                }
                <br />
              </div>
              <div>
                {date.seconds && (
                  <React.Fragment>
                    <span role='img' aria-label='date icon'>
                      🗓
                    </span>
                    <EventListItemCardDate isCancelled={cancelled}>
                      {format(
                        fromUnixTime(date.seconds),
                        ' EEEE, do MMMM yyyy'
                      )}
                    </EventListItemCardDate>
                  </React.Fragment>
                )}
              </div>
            </EventListItemCardEventInfo>
          </Card.Body>
          <Card.Body>
            <EventListCardPeopleGoingHeading>People going: {totalAttendees}</EventListCardPeopleGoingHeading>
          </Card.Body>
          <EventListItemCardPeopleGoing>
            {attendees &&
              Object.keys(attendees).map((attendee, index) => {
                return (
                  <EventListAttendee
                    key={index}
                    attendee={attendees[attendee]}
                  />
                );
              })}
          </EventListItemCardPeopleGoing>
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
