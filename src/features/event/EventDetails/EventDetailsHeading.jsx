import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import {
  attendEvent,
  unattendEvent,
} from '../../../app/redux/actions/userActions';
import {
  EventDetailsHeadingSection,
  EventDetailsHeadingTitle,
  EventDetailsCancelled,
  EventDetailsHostSection,
  EventDetailsHostImage,
  EventDetailsHostedBy,
  EventDetailsHostName,
} from '../../../app/styled/event/EventDetails/EventDetailsHeading';

class EventDetailsHeading extends Component {
  state = {
    user: this.props.user,
    isHost: this.props.user === this.props.event.hostedBy.hostId,
    isGoing: null,
  };

  static getDerivedStateFromProps(props, state) {
    for (const attendee in props.event.attendees) {
      if (attendee === props.user) {
        return {
          ...state,
          user: props.user,
          isGoing: true
        }
      } else {
        return {
          ...state,
          isGoing: false
        }
      }
    }
  }

  unattendEvent = () => {
    this.props.unattendEvent(this.props.event);
  };

  attendEvent = () => {
    this.props.attendEvent(this.props.event);
  };

  render() {
    const {
      event: {
        id,
        title,
        cancelled,
        hostedBy: { hostPhoto, name },
      }
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
            {!this.state.isHost && this.state.isGoing && (
              <Button onClick={this.unattendEvent} disabled={cancelled}>
                Cancel my place
              </Button>
            )}
            {!this.state.isHost && !this.state.isGoing && (
              <Button onClick={this.attendEvent} disabled={cancelled}>
                Book my place
              </Button>
            )}
            {this.state.isHost && (
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

const mapDispatchToProps = {
  attendEvent,
  unattendEvent,
};

export default connect(null, mapDispatchToProps)(EventDetailsHeading);
