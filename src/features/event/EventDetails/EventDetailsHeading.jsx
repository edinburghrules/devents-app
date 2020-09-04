import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

class EventDetailsHeading extends Component {
  render() {
    const {event: {title, id, cancelled, hostedBy: {hostPhoto, name}}, isHost, isGoing} = this.props;
    return (
      <div className='event-details-top'>
        <Container>
          <h1 className='event-details-top-h1'>{title}</h1>
          <h3 className='event-details-top-h1'>
            {cancelled && (
              <React.Fragment>
                <span role='img' aria-label='cross icon'>
                  ❌
                </span>
                <span> Event Cancelled</span>
              </React.Fragment>
            )}
          </h3>
          <div className='event-details-top-host'>
            <img src={hostPhoto && hostPhoto} alt='host' />
            <div>
              <h5 className='event-details-top-h5'>Hosted by</h5>
              <h6 className='event-details-top-h6'>{name && name}</h6>
            </div>
          </div>
          <div className='mt-4'>
            {!isHost && (
              <Button disabled={cancelled} size='lg'>
                {isGoing ? 'Cancel my place' : 'Book your place'}
              </Button>
            )}
            {isHost && (
              <Button
                as={Link}
                to={`/manageEvent/${id}`}
                size='lg'
                variant='info'
                className='ml-2'
              >
                Edit
              </Button>
            )}
          </div>
        </Container>
      </div>
    );
  }
}

export default EventDetailsHeading;
