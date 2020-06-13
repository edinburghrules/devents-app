import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import EventList from '../EventList/EventList';
import { connect } from 'react-redux';

class EventDashboard extends Component {
  render() {
    const {events} = this.props;
    return (
      <Container className='page-content'>
        <Row>
          <Col lg={8}>
            <EventList events={events}/>
          </Col>
          <Col md={true}>Left</Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.events
  }
} 

export default connect(mapStateToProps)(EventDashboard);
