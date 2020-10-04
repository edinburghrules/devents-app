import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import EventList from '../EventList/EventList';
import Filters from '../../filters/Filters';
import { EventDashboardContainer } from '../../../app/styled/event/EventDashboard/EventDashboard';
import EventCategories from '../EventCategories/EventCategories';

class EventDashboard extends Component {
  render() {
    const { events } = this.props;
    return (
      <EventDashboardContainer>
        <Filters />
        <EventCategories />
        <EventList events={events} />
      </EventDashboardContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.events,
  };
};

export default connect(mapStateToProps)(EventDashboard);
