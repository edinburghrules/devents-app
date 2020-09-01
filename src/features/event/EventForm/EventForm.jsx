/* global google */
import React, { Component } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { withFormik, Field } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import TextInput from '../../../app/form-inputs/TextInput';
import TextAreaInput from '../../../app/form-inputs/TextAreaInput';
import CategoryInput from '../../../app/form-inputs/CategoryInput';
import DatePickerInput from '../../../app/form-inputs/DatePickerInput';
import PlaceInput from '../../../app/form-inputs/PlaceInput';
import CostInput from '../../../app/form-inputs/CostInput';
import {
  createEvent,
  editEvent,
} from '../../../app/redux/actions/eventActions';

const coords = {
  city: {},
  venue: {},
};

class EventForm extends Component {
  getCoords = async (name, city) => {
    try {
      const geoCodeFetch = await geocodeByAddress(city);
      const results = await getLatLng(geoCodeFetch[0]);
      coords[name] = results;
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const {
      event,
      handleSubmit,
      handleChange,
      errors,
      touched,
      location,
      history,
      values,
    } = this.props;
    return (
      <Container className='event-form-container'>
        <h2 className='event-form-heading'>
          {event.id ? 'Edit Event' : 'Create Event'}
        </h2>
        <fieldset disabled={values.cancelled}>
          <Form id='eventForm' onSubmit={handleSubmit}>
            <Field
              as={TextInput}
              name='title'
              placeholder='Enter event title'
            />
            {touched.title && errors.hasOwnProperty('title') && (
              <Alert variant='danger'>{errors.title}</Alert>
            )}

            <Field
              as={TextInput}
              name='summary'
              placeholder='Enter event summary'
            />
            {touched.summary && errors.hasOwnProperty('summary') && (
              <Alert variant='danger'>{errors.summary}</Alert>
            )}

            <Field component={CategoryInput} name='category' />
            {touched.category && errors.hasOwnProperty('category') && (
              <Alert variant='danger'>{errors.summary}</Alert>
            )}

            <Field component={CostInput} name='cost' />

            <Field
              as={TextAreaInput}
              name='description'
              placeholder='Enter event description'
            />
            {touched.description && errors.hasOwnProperty('description') && (
              <Alert variant='danger'>{errors.description}</Alert>
            )}

            <Field
              component={DatePickerInput}
              name='date'
              placeholderText='Enter event date'
            />
            {touched.date && errors.hasOwnProperty('date') && (
              <Alert variant='danger'>{errors.date}</Alert>
            )}

            <Field
              component={PlaceInput}
              name='city'
              getCoords={this.getCoords}
              searchOptions={{ types: ['(cities)'] }}
            />
            {touched.city && errors.hasOwnProperty('city') && (
              <Alert variant='danger'>{errors.city}</Alert>
            )}

            <Field
              component={PlaceInput}
              name='venue'
              getCoords={this.getCoords}
              searchOptions={{
                location: new google.maps.LatLng(coords.city),
                radius: 2000,
                types: ['establishment'],
              }}
            />
            {touched.venue && errors.hasOwnProperty('venue') && (
              <Alert variant='danger'>{errors.venue}</Alert>
            )}
          </Form>
        </fieldset>
        {event.id && <Form.Label>Cancel Event</Form.Label>}
        {location.pathname !== '/createEvent' ? (
          <Form.Check
            name='cancelled'
            onChange={handleChange}
            type='switch'
            id='custom-switch'
            checked={values.cancelled}
            label={''}
          />
        ) : null}
        <div className='form-btns'>
          <Button form='eventForm' type='submit' variant='success'>
            Submit
          </Button>
          <Button
            onClick={() => {
              if (event.id) {
                history.push(`/event/${event.id}`);
              } else {
                history.push('/');
              }
            }}
            variant='danger'
          >
            Cancel
          </Button>
        </div>
      </Container>
    );
  }
}

const formikEventForm = withFormik({
  mapPropsToValues: (props) => {
    if (props.event) {
      return {
        ...props.event,
        date: new Date(),
      };
    } else {
      return {
        title: '',
        summary: '',
        description: '',
        date: null,
        city: '',
        venue: '',
        category: '',
        cost: 0,
      };
    }
  },
  validationSchema: Yup.object().shape({
    title: Yup.string()
      .min(4, 'Your event must have a title of at least 4 characters.')
      .required('You must provide the title of your event.'),
    summary: Yup.string()
      .min(10, 'Your event must have a summary of at least 10 characters.')
      .required('You must provide a summary of your event.'),
    description: Yup.string()
      .max(500, 'Too long!')
      .min(8, 'Too short!')
      .required('You must provide a description of your event.'),
    category: Yup.string().required('Event description is required'),
    city: Yup.string().required(
      'You must provide the city or town of your event.'
    ),
    venue: Yup.string().required('You must provide an event venue.'),
    date: Yup.date().required('Please provide and event date.').nullable(),
  }),
  handleSubmit: async (values, formikBag) => {
    const {
      event,
      location,
      history,
      createEvent,
      editEvent,
    } = formikBag.props;

    if (location.pathname === '/createEvent') {
      const newEvent = {
        ...values,
        latlng: coords.venue,
      };
      let createdEventId = await createEvent(newEvent);
      history.push(`/event/${createdEventId}`);
    } else {
      const editedEvent = {
        ...event,
        ...values,
      };
      try {
        let editedEventId = await editEvent(editedEvent);
        history.push(`/event/${editedEventId}`);
      } catch (err) {
        console.log(err);
      }
    }
  },
})(EventForm);

const mapStateToProps = (state, ownProps) => {
  if (ownProps.match.params.id === undefined) {
    return { event: {} };
  } else {
    let event = state.events.find((event) => {
      return event.id.toString() === ownProps.match.params.id.toString();
    });
    return event ? { event } : { event: {} };
  }
};

const mapDispatchToProps = {
  createEvent,
  editEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(formikEventForm);
