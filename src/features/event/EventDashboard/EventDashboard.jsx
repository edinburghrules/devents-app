import React, { Component } from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import EventList from '../EventList/EventList';
import Filters from '../../filters/Filters';
import EventDashboardHeader from '../EventDashboardHeader/EventDashboardHeader';
import EventCategoriesMenu from '../EventCategories/EventCategoryMenu/EventCategoriesMenu';


const EventDashboardContainer = styled(Container)`
  margin: 8rem auto;
  max-width: 960px;
`;

class EventDashboard extends Component {
  render() {
    const { events } = this.props;
    return (
      <React.Fragment>
        <EventDashboardHeader/>
        <EventDashboardContainer>
          <Filters />
          <EventCategoriesMenu />
          <EventList events={events} />
        </EventDashboardContainer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.events.localEvents
  };
};

export default connect(mapStateToProps)(EventDashboard);
