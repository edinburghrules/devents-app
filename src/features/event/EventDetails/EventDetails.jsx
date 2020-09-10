import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import EventDashboard from '../EventDashboard/EventDashboard';
import EventDetailsHeading from './EventDetailsHeading';
import EventDetailsInformation from './EventDetailsInformation';

class EventDetails extends Component {

  render() {
    if (this.props.event === undefined) return <EventDashboard />;

    const {
      event,
      isHost,
      isGoing
    } = this.props;

    return (
      <Fragment>
        <EventDetailsHeading
          isHost={isHost}
          isGoing={isGoing}
          event={event}
        />
        <EventDetailsInformation isHost={isHost} event={event} />
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let event = state.events.find((event) => {
    return event.id.toString() === ownProps.match.params.id.toString();
  })

  let isGoing;

  if (event === undefined) {
    return {
      
    }; 
  } else {
    if(event.attendees.hasOwnProperty(state.profile.userProfile.uid)) {
      isGoing = true;
    } else {
      isGoing = false;
    }
  }



  return {
    event,
    isHost: state.profile.userProfile.uid === event.hostedBy.hostId,
    user: state.profile.userProfile.uid,
    isGoing
  };
};


export default connect(mapStateToProps)(EventDetails);
