import React, { Component } from 'react'
import EventListItem from './EventListItem'

class EventList extends Component {
  render() {
    const {events} = this.props;
    console.log(events)
    return (
      <div>
      {events && events.map((event) => {
        return (
          <EventListItem key={event.id} event={event}/>
        )
      })}
      </div>
    )
  }
}

export default EventList;
