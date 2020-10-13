import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { categoryOptions } from '../../../app/form-inputs/CategoryInput';
import EventCategoryList from '../EventCategories/EventCategoryList/EventCategoryList';

const EventCategoryPageContainer = styled.div`
  margin: 8rem auto;
  max-width: 960px;
`;

const EventCategoryPageTitle = styled.h1`
  font-weight: 600;
  font-size: 1.8rem;
  margin-bottom: 8rem;
`;



class EventCategoryPage extends React.Component {
  render() {
    const { events, match } = this.props;

    return (
      <EventCategoryPageContainer>
        {categoryOptions.map((cat, index) => {
          return cat.value === match.params.id ? (<EventCategoryPageTitle key={index}>{cat.text}</EventCategoryPageTitle>) : null;
        })}
        <EventCategoryList events={events} />
      </EventCategoryPageContainer>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let events = state.events.allEvents.filter(
    (event) => event.category === ownProps.match.params.id
  );
  return { events };
};

export default connect(mapStateToProps)(EventCategoryPage);
