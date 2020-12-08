import React from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import { fromUnixTime } from 'date-fns'
import { connect } from 'react-redux';
import { categoryOptions } from '../../../../app/form-inputs/CategoryInput';
import Filter from '../../../filters/Filters';
import EventCategoryList from '../EventCategoryList/EventCategoryList';

const EventCategoryPageContainer = styled(Container)`
  margin-top: 4rem;

  @media(max-width: 595px) {
    margin-top: 1rem;
  }
`;

const EventCategoryPageTitle = styled.h1`
  font-weight: 600;
  font-size: 1.4rem;
  margin-bottom: 4rem;
  margin-top: 4rem;

  @media(max-width: 595px) {
    margin-bottom: 2rem;
  }
`;

class EventCategoryPage extends React.Component {
  render() {
    const { events, match } = this.props;
    return (

      <EventCategoryPageContainer>
      <Filter />
        {categoryOptions.map((category, index) => {
          return category.value === match.params.id ? (<EventCategoryPageTitle key={index}>{category.text}</EventCategoryPageTitle>) : null;
        })}
        <EventCategoryList events={events} />
      </EventCategoryPageContainer>
    );
  }
}

let eventSelector = (state, category) => {
  return state.events.events.filter(event => {
    return fromUnixTime(event.date.seconds) >= new Date() && event.category === category;
  })
}

const mapStateToProps = (state, ownProps) => {
 return {
   events: eventSelector(state, ownProps.match.params.id)
 }
};

export default connect(mapStateToProps)(EventCategoryPage);
