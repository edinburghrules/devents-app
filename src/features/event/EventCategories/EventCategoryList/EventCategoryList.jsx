import React from 'react';
import EventListItem from '../../EventList/EventListItem';

class EventCategoryList extends React.Component {
  render() {
    let { events } = this.props;
    return (
      <React.Fragment>
        {events &&
          events.map((event) => {
            return <EventListItem key={event.id} event={event} />;
          })}
      </React.Fragment>
    );
  }
}

export default EventCategoryList;
