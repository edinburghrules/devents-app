import React, { Component } from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import { fromUnixTime } from 'date-fns';
import { connect } from 'react-redux';
import EventList from '../EventList/EventList';
import Filters from '../../filters/Filters';
import EventDashboardHeader from '../EventDashboardHeader/EventDashboardHeader';
import EventCategoriesMenu from '../EventCategories/EventCategoryMenu/EventCategoriesMenu';

const EventDashboardContainer = styled(Container)`
  margin: 5rem auto;
  max-width: 960px;
  height: 100vh;
`;

const EventDashboardBG = styled.div`
  background: white;
`;

class EventDashboard extends Component {
  render() {
    const { events } = this.props;
    return (
      <React.Fragment>
      <EventDashboardBG>
        <EventDashboardHeader/>
      </EventDashboardBG>  
        <Filters />
        <EventDashboardContainer>
          <EventCategoriesMenu />
          <EventList events={events} />
        </EventDashboardContainer>
      </React.Fragment>
    );
  }
}

const eventSelector = (events) => {
  return events.filter(event => fromUnixTime(event.date.seconds) > new Date());
}

const mapStateToProps = (state) => {
  return {
    events: eventSelector(state.events.events)
  };
};

export default connect(mapStateToProps)(EventDashboard);
