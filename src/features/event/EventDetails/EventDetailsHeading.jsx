import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import {
  EventDetailsHeadingSection,
  EventDetailsHeadingTitle,
  EventDetailsCancelled,
  EventDetailsHostSection,
  EventDetailsHostImage,
  EventDetailsHostedBy,
  EventDetailsHostName
} from '../../../app/styled/event/EventDetails/EventDetailsHeading';

class EventDetailsHeading extends Component {
  render() {
    const {
      event: {
        title,
        id,
        cancelled,
        hostedBy: { hostPhoto, name },
      },
      isHost,
      isGoing,
    } = this.props;
    return (
      <EventDetailsHeadingSection>
        <Container>
          <EventDetailsHeadingTitle>{title}</EventDetailsHeadingTitle>
          <EventDetailsCancelled>
            {cancelled && (
              <React.Fragment>
                <span role='img' aria-label='cross icon'>
                  ❌
                </span>
                <span> Event Cancelled</span>
              </React.Fragment>
            )}
          </EventDetailsCancelled>
          <EventDetailsHostSection>
            <EventDetailsHostImage src={hostPhoto && hostPhoto} alt='host' />
            <div>
              <EventDetailsHostedBy>Hosted by</EventDetailsHostedBy>
              <EventDetailsHostName>{name && name}</EventDetailsHostName>
            </div>
          </EventDetailsHostSection>
          <div className='mt-4'>
            {!isHost && (
              <Button disabled={cancelled}>
                {isGoing ? 'Cancel my place' : 'Book your place'}
              </Button>
            )}
            {isHost && (
              <Button
                as={Link}
                to={`/manageEvent/${id}`}
                variant='info'
                className='ml-2'
              >
                Edit
              </Button>
            )}
          </div>
        </Container>
      </EventDetailsHeadingSection>
    );
  }
}

export default EventDetailsHeading;
