import React, { Component } from 'react';
import styled from 'styled-components';
import { Spinner } from 'react-bootstrap';
import EventListItem from './EventListItem';
import InfiniteScroll from 'react-infinite-scroll-component';

const EventListContainer = styled.div`
  overflow: hidden;
`;

const EventListHeading = styled.h6`
  margin-bottom: 2rem;
`;

class EventList extends Component {
  state = {
    slicedEvents: [],
    events: this.props.events,
    start: 0,
    end: 1,
    moreToLoad: true,
  };

  componentDidMount = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        slicedEvents: prevState.events.slice(this.state.start, this.state.end),
      };
    });
  };

  incrementSlicePoints = (inc) => {
    this.setState((prevState) => {
      return {
        start: prevState.start + inc,
        end: prevState.end + inc,
      };
    });
  };

  fetchMoreData = () => {
    if (this.state.slicedEvents.length === this.state.events.length) {
      this.setState({
        moreToLoad: false,
      });
    } else {
      this.incrementSlicePoints(1);
      setTimeout(() => {
        this.setState((prevState) => {
          return {
            ...prevState,
            slicedEvents: [
              ...prevState.slicedEvents,
              ...prevState.events.slice(prevState.start, prevState.end),
            ],
          };
        });
      }, 1500);
    }
  };

  render() {
    const { slicedEvents, moreToLoad } = this.state;
    console.log(slicedEvents);
    let loader = (
      <div style={{width: '100%', textAlign: 'center'}}>
        <Spinner variant='primary' size='sm' animation='border' />
      </div>
    );
    return (
      <EventListContainer>
        <EventListHeading>Latest events near you</EventListHeading>
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
          dataLength={this.state.slicedEvents.length}
          next={this.fetchMoreData}
          hasMore={moreToLoad}
          loader={loader}
          endMessage={
            <p style={{ textAlign: 'center', marginTop: '4rem' }}>
              <b>No more events to show</b>
            </p>
          }
        >
          {slicedEvents &&
            slicedEvents.map((event) => {
              return <EventListItem key={event.id} event={event} />;
            })}
        </InfiniteScroll>
      </EventListContainer>
    );
  }
}

export default EventList;
