import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import EventListAttendee from './EventListAttendee';
import { fromUnixTime, format } from 'date-fns';
import { withRouter } from 'react-router-dom';
import { attendEvent } from '../../../app/redux/actions/userActions';
import {
  EventListItemCardLink,
  EventListItemCard,
  EventListItemCardTitle,
  EventListItemCardBookButton,
  EventListItemCardEventInfo,
  EventListItemCardPeopleGoing,
  EventListItemCardCancelledTextContainer,
  EventListItemCardCancelledIcon,
  EventListItemCardDate,
} from '../../../app/styled/event/EventList/EventListItem';

class EventListItem extends Component {
  handleClick = (e) => {
    e.preventDefault();
    this.props.history.push(`/event/${this.props.event.id}`);
  };

  attend = (e) => {
    e.stopPropagation();
    e.preventDefault();
    this.props.attendEvent(this.props.event);

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
        hostedBy: { hostId },
      },
      user,
    } = this.props;

    let isHost = hostId === user;
    let isGoing;

    for (const attendee in attendees) {
      if (attendee === user) {
        isGoing = true;
      } else {
        isGoing = false;
      }
    }

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
          <EventListItemCardPeopleGoing>
            <p>People going :</p>
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

          <EventListItemCardBookButton className='card-top'>
            {!isHost && (
              <Button disabled={cancelled} onClick={this.attend}>
                {isGoing ? 'Cancel your place' : 'Book your place'}
              </Button>
            )}
          </EventListItemCardBookButton>
        </EventListItemCard>
      </EventListItemCardLink>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.currentUser.uid,
  };
};

const mapDispatchToProps = {
  attendEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EventListItem));
