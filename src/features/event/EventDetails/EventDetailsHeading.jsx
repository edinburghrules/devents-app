import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Spinner, Button } from 'react-bootstrap';
import {
  attendEvent,
  unattendEvent,
} from '../../../app/redux/actions/userActions';


const EventDetailsHeadingSection = styled.div`
  background: #fff;
  padding: 8rem 0rem 4rem 0rem;
  width: 100%;
  margin: 0 auto;

  @media(max-width: 595px) {
    padding-top: 4em;
  }
`;

const EventDetailsHeadingTitle = styled.h1`
  font-weight: 600;
  padding-bottom: .5rem;
  color: #222;

  @media(max-width: 595px) {
    font-size: 2rem;

  }
`;

const EventDetailsCancelled = styled(EventDetailsHeadingTitle)`
  font-size: 1.4rem;
`;

const EventDetailsHostSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2em;
`;

const EventDetailsHostImage = styled.img`
  height: 70px;
  margin-right: 1rem;
  border-radius: 50%;
`;

const EventDetailsHostedBy = styled.h6`
  font-weight: 400;
  color: #222;
`;

const EventDetailsHostName = styled.h5`
  font-weight: 600;
  color: #333;
`;

const EventDetailsAttendButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12rem;
  height: 3rem;
  background: #ff6f61 !important;
  border: none;
`;

const EventDetailsUnattendButton = styled(EventDetailsAttendButton)`
  width: 12rem;
  height: 3rem;
  background: #ff6f61 !important;
  border: none;
`;

const EventDetailsEditButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12rem;
  height: 3rem;
  background: #ff6f61 !important;
  border: none;
  color: #fff;
  border-radius: 4px;

  &:hover {
    text-decoration: none;
    color: #fff;
    background: rgba(23,162,184, 0.8);
  }

  &:active {
    background: #128293;
  }
`;


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
            <EventDetailsAttendButton>
              <Spinner animation='border' size='sm' variant='light' />
            </EventDetailsAttendButton>
          );
        } else {
          if (!this.state.isHost) {
            if (this.state.isGoing) {
              return (
                <EventDetailsUnattendButton
                  onClick={this.unattendEvent}
                  disabled={cancelled || isBooking}
                >
                  Cancel your place
                </EventDetailsUnattendButton>
              );
            } else {
              return (
                <EventDetailsAttendButton
                  onClick={this.attendEvent}
                  disabled={cancelled || isBooking}
                >
                  Book your place
                </EventDetailsAttendButton>
              );
            }
          } else {
            return (
              <EventDetailsEditButton
                as={Link}
                to={`/manage-event/${id}`}
              >
                Edit
              </EventDetailsEditButton>
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
