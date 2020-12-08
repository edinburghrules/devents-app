import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import EventDetailsHeading from './EventDetailsHeading';
import EventDetailsInformation from './EventDetailsInformation';

class EventDetails extends Component {

  render() {
    if (this.props.event === undefined) return <Redirect to='/' />;

    const {
      event,
      isHost,
      isGoing,
      currentUser
    } = this.props;

    let user = currentUser.hasOwnProperty('uid') ? true : false;

    return (
      <Fragment>
        <EventDetailsHeading
          isHost={isHost}
          isGoing={isGoing}
          event={event}
        />
        <EventDetailsInformation user={user} currentUser={currentUser} isHost={isHost} event={event} />
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let event = state.events.events.find((event) => {
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
    currentUser: {...state.auth.currentUser, photoURL: state.profile.userProfile.photoURL, displayName: state.profile.userProfile.displayName},
    isGoing
  };
};


export default connect(mapStateToProps)(EventDetails);
