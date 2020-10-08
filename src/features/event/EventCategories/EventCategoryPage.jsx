import React from 'react';
import { connect } from 'react-redux';
import { categoryOptions } from '../../../app/form-inputs/CategoryInput';
import EventCategoryList from '../EventCategories/EventCategoryList/EventCategoryList';
import { EventCategoryPageContainer, EventCategoryPageTitle } from '../../../app/styled/event/EventCategories/EventCategoryPage';



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
  let events = state.events.filter(
    (event) => event.category === ownProps.match.params.id
  );
  return { events };
};

export default connect(mapStateToProps)(EventCategoryPage);
