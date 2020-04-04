import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

class EventDashboard extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col lg={true}>Right</Col>
          <Col lg={true}>Left</Col>
        </Row>
      </Container>
    );
  }
}

export default EventDashboard;
