import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import EventList from '../EventList/EventList';
import { EventDashboardContainer } from '../../../app/styled/event/EventDashboard/EventDashboard';


class EventDashboard extends Component {
  render() {
    const { events } = this.props;
    return (
      <EventDashboardContainer>
        <Row>
          <Col lg={6}>
            <EventList events={events} />
          </Col>
          <Col lg={6}>Left</Col>
        </Row>
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
