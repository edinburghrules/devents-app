import React, { Component } from 'react';
import styled from 'styled-components';
import EventListItem from './EventListItem';

const EventListHeading = styled.h6`
margin-bottom: 2rem;
`;

class EventList extends Component {
  render() {
    const { events } = this.props;
    return (
      <React.Fragment>
      <EventListHeading>Latest events near you</EventListHeading>
        {events &&
          events.map(event => {
            return <EventListItem key={event.id} event={event} />;
          })}
      </React.Fragment>
    );
  }
}

export default EventList;
