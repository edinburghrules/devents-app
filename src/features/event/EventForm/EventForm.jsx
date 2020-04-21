/* global google */
import React, { Component } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { withFormik, Field } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import TextInput from '../../../app/form-inputs/TextInput';
import TextAreaInput from '../../../app/form-inputs/TextAreaInput';
import DatePickerInput from '../../../app/form-inputs/DatePickerInput';
import PlaceInput from '../../../app/form-inputs/PlaceInput';

class EventForm extends Component {
  state = {
    city: {},
    venue: {},
  };

  getCoords = async (name, city) => {
    const geoCodeFetch = await geocodeByAddress(city);
    const results = await getLatLng(geoCodeFetch[0]);
    this.setState({
      [name]: results,
    });
  };
  render() {
    const { handleSubmit, errors, touched } = this.props;
    return (
      <Container className='event-form-container'>
        <h2 className='event-form-heading'>Create Event</h2>
        <Form onSubmit={handleSubmit}>
          <Field as={TextInput} name='title' placeholder='Enter event title' />
          {touched.title && errors.hasOwnProperty('title') && (
            <Alert variant='danger'>{errors.title}</Alert>
          )}

          <Field
            as={TextAreaInput}
            name='description'
            placeholder='Enter event description'
          />
          {touched.description && errors.hasOwnProperty('description') && (
            <Alert variant='danger'>{errors.description}</Alert>
          )}

          <Field component={DatePickerInput} name='date' />

          <Field
            component={PlaceInput}
            name='city'
            getCoords={this.getCoords}
            searchOptions={{types: ['(cities)']}}
          />
          {touched.city && errors.hasOwnProperty('city') && (
            <Alert variant='danger'>{errors.city}</Alert>
          )}

          <Field
            component={PlaceInput}
            name='venue'
            getCoords={this.getCoords}
            searchOptions= { 
              {
                location: new google.maps.LatLng(this.state.city),
                radius: 2000,
                types: ['establishment']
              }
            }
          />
          {touched.city && errors.hasOwnProperty('venue') && (
            <Alert variant='danger'>{errors.city}</Alert>
          )}

          <br />
          <div className='form-btns'>
            <Button type='submit' variant='success'>
              Submit
            </Button>
            <Button variant='danger'>Cancel</Button>
          </div>
        </Form>
      </Container>
    );
  }
}

const formikEventForm = withFormik({
  mapPropsToValues: (props) => {
    return {
      title: props.event.title || '',
      description: props.event.description || '',
      date: props.event.date || new Date(),
      city: props.event.city || '',
      venue: props.event.venue || '',
      category: '',
    };
  },
  validationSchema: Yup.object().shape({
    title: Yup.string()
      .min(4, 'Your event must have a title of at least 4 characters.')
      .required('You must provide the title of your event.'),
    description: Yup.string()
      .max(500, 'Too long!')
      .min(8, 'Too short!')
      .required('You must provide a description of your event.'),
    // category: Yup.string()
    //   .required('Event description is required'),
    city: Yup.string().required(
      'You must provide the city or town of your event.'
    ),
    // venue: Yup.string().required(),
    date: Yup.date().required(),
  }),
  handleSubmit: (values, formikBag) => {
    console.log(values);
  },
})(EventForm);

const mapStateToProps = (state) => {
  return {
    event: state.events,
  };
};

export default connect(mapStateToProps)(formikEventForm);
