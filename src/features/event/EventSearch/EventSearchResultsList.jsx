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

class EventSearchResultsList extends React.Component {
  render() {
    let { results } = this.props;
    return (
      <React.Fragment>
        <Filter/>
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
  }
}

let eventSearchSelector = (state, searchText) => {
  return state.events.localEvents.filter((event) => {
    return event.title.toLowerCase().includes(searchText.toLowerCase());
  });
};

const mapStateToProps = (state, ownProps) => {
  return {
    results: eventSearchSelector(state, ownProps.match.params.id),
  };
};

export default connect(mapStateToProps)(withRouter(EventSearchResultsList));
