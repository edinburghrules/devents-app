import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { categoryOptions } from '../../../../app/form-inputs/CategoryInput';
import Filter from '../../../filters/Filters';
import EventCategoryList from '../EventCategoryList/EventCategoryList';

const EventCategoryPageContainer = styled.div`
  margin: 8rem auto;
  max-width: 960px;
`;

const EventCategoryPageTitle = styled.h1`
  font-weight: 600;
  font-size: 1.8rem;
  margin-bottom: 4rem;
`;



class EventCategoryPage extends React.Component {
  render() {
    const { events, match } = this.props;
    return (
      <React.Fragment>
      <Filter />
      <EventCategoryPageContainer>
        {categoryOptions.map((category, index) => {
          return category.value === match.params.id ? (<EventCategoryPageTitle key={index}>{category.text}</EventCategoryPageTitle>) : null;
        })}
        <EventCategoryList events={events} />
      </EventCategoryPageContainer>
      </React.Fragment>
    );
  }
}

let eventSelector = (state, category) => {
  return state.events.localEvents.filter(event => {
    return event.category === category
  })
}

const mapStateToProps = (state, ownProps) => {
 return {
   events: eventSelector(state, ownProps.match.params.id)
 }
};

export default connect(mapStateToProps)(EventCategoryPage);
