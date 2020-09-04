import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import EventDashboard from '../EventDashboard/EventDashboard';
import EventDetailsHeading from './EventDetailsHeading';
import EventDetailsInformation from './EventDetailsInformation';

class EventDetails extends Component {
  render() {
    if (this.props.event === undefined) return <EventDashboard />;

    const {
      event: {
        hostedBy: { hostId },
        attendees,
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
      <Fragment>
        <EventDetailsHeading
          isHost={isHost}
          isGoing={isGoing}
          event={this.props.event}
        />
        <EventDetailsInformation event={this.props.event} />
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    event: state.events.find((event) => {
      return event.id.toString() === ownProps.match.params.id.toString();
    }),
    user: state.profile.userProfile.uid,
  };
};

export default connect(mapStateToProps)(EventDetails);
