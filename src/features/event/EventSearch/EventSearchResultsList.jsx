import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EventListItem from '../EventList/EventListItem';
import Filter from '../../filters/Filters';

const EventResultsListContainer = styled.div`
  margin: 8rem auto;
  max-width: 960px;
`;

const EventSearchResultsListTitle = styled.h1`
  font-weight: 600;
  font-size: 1.8rem;
  margin-bottom: 4rem;
`;

const NoResultsContainer = styled.div`
  margin-top: 10rem;
  width: 100%;
  text-align: center;
`;

const NoResultsText = styled.h1`
  font-weight: 600;
  font-size: 1.2rem;
`;

const NoResultsSubText = styled.h1`
  margin-top: .5rem;
  font-weight: 500;
  font-size: 1rem;
`;

class EventSearchResultsList extends React.Component {
  render() {
    let { results, match } = this.props;
    if (results.length > 0) {
      return (
        <React.Fragment>
          <Filter />
          <EventResultsListContainer>
            <EventSearchResultsListTitle>
              Search results
            </EventSearchResultsListTitle>

            {results &&
              results.map((event) => {
                return <EventListItem key={event.id} event={event} />;
              })}
          </EventResultsListContainer>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Filter />
          <EventResultsListContainer>
            <NoResultsContainer>
              <NoResultsText>Sorry, there are no results for events near you.</NoResultsText>
              <NoResultsSubText>Try searching for something else.</NoResultsSubText>
            </NoResultsContainer>
          </EventResultsListContainer>
        </React.Fragment>
      );
    }
  }
}

let eventSearchSelector = (state, searchText) => {
  return state.events.localEvents.filter((event) => {
    return event.title.toLowerCase().includes(searchText.toLowerCase());
  });
};

const mapStateToProps = (state, ownProps) => {
  if (ownProps.match.params.id === 'no-search-string') {
    return {
      results: state.events.localEvents,
    };
  } else {
    return {
      results: eventSearchSelector(state, ownProps.match.params.id),
    };
  }
};

export default connect(mapStateToProps)(withRouter(EventSearchResultsList));
