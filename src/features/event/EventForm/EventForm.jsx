import React, { Component } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withFormik } from 'formik';

class EventForm extends Component {
  render() {
    return (
      <Container className='event-form-container'>
        <h2 className='event-form-heading'>Create Event</h2>
        <Form>
          <Form.Group>
            <Form.Label>Event title</Form.Label>
            <Form.Control type='email' placeholder='Enter event title' />
          </Form.Group>

          <Form.Group>
            <Form.Label>Event date</Form.Label>
            <Form.Control type='text' placeholder='Enter event date' />
          </Form.Group>

          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control type='text' placeholder='Enter event city' />
          </Form.Group>

          <Form.Group>
            <Form.Label>Venue</Form.Label>
            <Form.Control type='text' placeholder='Enter event venue' />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as='textarea' placeholder='Enter event description' />
          </Form.Group>
          <br/>
          <div className='form-btns'>
            <Button variant='primary'>
              Submit
            </Button>
            <Button variant='info'>
              Cancel
            </Button>
          </div>
        </Form>
      </Container>
    );
  }
}

const formikEventForm = withFormik({
  mapValuesToProps: props => {
    return {
      title: props.event.title || '',
      description: props.event.description || '',
      date: props.event.date || new Date(),
      city: props.event.city || '',
      venue: props.event.venue || '',
      category: ''
    }
  }
})(EventForm)

const mapStateToProps = state => {
  return {
    event: state.events
  }
}

export default connect(mapStateToProps)(formikEventForm);
