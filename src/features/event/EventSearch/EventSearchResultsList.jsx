import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Filter from '../../filters/Filters';
import InfiniteScrollComponent from '../../../app/utils/InfiniteScroll';

const EventResultsListContainer = styled.div`
  margin: 8rem auto;
  max-width: 960px;
  /* overflow: hidden; */
  height: 50vh;
`;

const EventSearchResultsListTitle = styled.h1`
  font-weight: 600;
  font-size: 1.4rem;
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
    let { results, searchLocation } = this.props;
    if (results.length > 0) {
      return (
        <React.Fragment>
          <Filter />
          <EventResultsListContainer>
            <EventSearchResultsListTitle>
              Events near <span style={{fontStyle: 'italic'}}>"{searchLocation}"</span>
            </EventSearchResultsListTitle>
            <InfiniteScrollComponent events={results}/>
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
  if(searchText === 'no-search-string') {
    return state.events.events;
  } else {
    return state.events.events.filter((event) => {
      return event.title.toLowerCase().includes(searchText.toLowerCase());
    });
  }
};



const mapStateToProps = (state, ownProps) => {
  return {
    results: eventSearchSelector(state, ownProps.match.params.id),
    searchLocation: state.profile.searchLocation
  }
};

export default connect(mapStateToProps)(withRouter(EventSearchResultsList));
