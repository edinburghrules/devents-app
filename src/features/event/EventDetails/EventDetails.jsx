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
      user
    } = this.props;

    return (
      <Fragment>
        <EventDetailsHeading
          user={user}
          event={event}
        />
        <EventDetailsInformation event={event} />
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
