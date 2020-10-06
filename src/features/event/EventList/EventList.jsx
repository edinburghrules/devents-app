import React, { Component } from 'react';
import { EventListHeading } from '../../../app/styled/event/EventList/EventList';
import EventListItem from './EventListItem';

class EventList extends Component {
  render() {
    const { events } = this.props;
    return (
      <React.Fragment>
      <EventListHeading>Latest events near you</EventListHeading>
        {events &&
          events.map((event) => {
            return <EventListItem key={event.id} event={event} />;
          })}
      </React.Fragment>
    );
  }
}

export default EventList;
