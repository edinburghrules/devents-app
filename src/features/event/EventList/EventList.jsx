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

const NoMoreEvents = styled(EventListHeading)`
  margin-top: 6rem;
  color: #000;
  text-align: center;
`

const Loading = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  transition: opacity 3.5s ease-in;
`;

const Ball = styled.div`
  background-color: #999;
  border-radius: 50%;
  margin: 5px;
  height: 7px;
  width: 7px;
  animation: jump 0.5s ease-in infinite;

  @keyframes jump {
    0%,
    100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-10px);
    }
  }

  &:nth-of-type(2) {
    animation-delay: 0.1s;
  }

  &:nth-of-type(3) {
    animation-delay: 0.2s;
  }
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
      <Loading>
        <Ball/>
        <Ball/>
        <Ball/>
      </Loading>
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
          endMessage={(<NoMoreEvents>No more events to load</NoMoreEvents>)
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
