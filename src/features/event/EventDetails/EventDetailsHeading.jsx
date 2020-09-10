import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Button, Spinner } from 'react-bootstrap';
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
  constructor(props) {
    super(props);
    this.state = {
      event: this.props.event,
      isHost: this.props.isHost,
      isGoing: this.props.isGoing,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isGoing !== this.props.isGoing) {
      this.setState((state) => ({
        ...state,
        isGoing: !state.isGoing,
      }));
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
      },
      isBooking,
      currentUser,
    } = this.props;

    const renderBtns = () => {
      if (currentUser !== null) {
        if (isBooking) {
          return (
            <Button>
              <Spinner animation='border' size='sm' variant='light' />
            </Button>
          );
        } else {
          if (!this.state.isHost) {
            if (this.state.isGoing) {
              return (
                <Button
                  onClick={this.unattendEvent}
                  disabled={cancelled || isBooking}
                >
                  {isBooking ? 'BOOKING' : 'Cancel your place'}
                </Button>
              );
            } else {
              return (
                <Button
                  onClick={this.attendEvent}
                  disabled={cancelled || isBooking}
                >
                  {isBooking ? 'BOOKING' : 'Book your place'}
                </Button>
              );
            }
          } else {
            return (
              <Button
                as={Link}
                to={`/manageEvent/${id}`}
                variant='info'
                className='ml-2'
              >
                Edit
              </Button>
            );
          }
        }
      }
    };

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
          <div className='mt-4'>{renderBtns()}</div>
        </Container>
      </EventDetailsHeadingSection>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isBooking: state.async.submitting,
    currentUser: state.auth.currentUser,
  };
};

const mapDispatchToProps = {
  attendEvent,
  unattendEvent,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetailsHeading);
