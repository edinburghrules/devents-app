import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import InfiniteScrollComponent from '../../../app/utils/InfiniteScroll';

const EventListContainer = styled.div`
  overflow: hidden;
`;

const EventListHeading = styled.h6`
  margin-bottom: -1rem;

  @media(max-width: 767px) {
    margin-bottom: 2rem;
  }
`;

class EventList extends Component {
  render() {
    const { events } = this.props;
    return (
      <Container>
        <EventListContainer>
          <EventListHeading>Latest events near you</EventListHeading>
          <InfiniteScrollComponent events={events} />
        </EventListContainer>
      </Container>
    );
  }
}

export default EventList;
