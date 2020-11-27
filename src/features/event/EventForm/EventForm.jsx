/* global google */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, Alert, Spinner, Container, Button } from 'react-bootstrap';
import { addDays, fromUnixTime } from 'date-fns';
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
import EventFormPhoto from '../../../app/form-inputs/EventFormPhoto';
import {
  createEvent,
  editEvent,
  eventPhotoUpload,
} from '../../../app/redux/actions/eventActions';
import firebase from '../../../app/config/firebase';
import { toast } from 'react-toastify';

const EventFormContainer = styled(Container)`
  margin: 10rem auto;
`;

const EventFormHeading = styled.h2`
  margin-bottom: 3rem;
  font-weight: 600;
  color: #222;
`;

const EventFormButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
`;

const EventFormSubmitBtn = styled(Button)`
  height: 4rem;
  width: 4rem;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ff6f61 !important;
  border: 1px solid #ff6f61 !important;
  font-size: 2rem;
`;

const EventFormImage = styled.img`
  width: 20%;
  margin-top: 2rem;
`;

const Notification = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem;
`;

const NotificationIcon = styled.img`
  height: 25px;
  margin-right: 1rem;
`;

let coords;

const coordsFromLS = localStorage.getItem('coords');

if (coordsFromLS) {
  coords = JSON.parse(coordsFromLS);
} else {
  coords = {
    city: {},
    venue: {},
  };
}

class EventForm extends Component {

  componentWillUnmount = () => {
    if(this.props.event && this.props.location.pathname === `/manage-event/${this.props.event.id}`) {
      localStorage.removeItem('editEventFieldValues');
    }
  }

  getCoords = async (name, city) => {
    try {
      const geoCodeFetch = await geocodeByAddress(city);
      const results = await getLatLng(geoCodeFetch[0]);
      coords[name] = results;
      localStorage.setItem('coords', JSON.stringify(coords));
    } catch (err) {
      console.log(err);
    }
  };

  saveToLocalStorage = () => {
    if (this.props.values)
    if(this.props.location.pathname === '/create-event') {
      localStorage.setItem('createEventFieldValues', JSON.stringify(this.props.values));
    } else if (this.props.location.pathname === `/manage-event/${this.props.event.id}`) {
      localStorage.setItem('editEventFieldValues', JSON.stringify(this.props.values));
    }
  };

  render() {
    const {
      event,
      handleSubmit,
      errors,
      touched,
      location,
      values,
      setFieldValue,
      isSubmitting,
    } = this.props;

    
    this.saveToLocalStorage();

      return (
        <EventFormContainer>
          <EventFormHeading>
            {event && event.id ? 'Edit Your Event' : 'Host Your Event'}
          </EventFormHeading>
          <fieldset disabled={values.cancelled}>
            <Form id='eventForm' onSubmit={handleSubmit} noValidate={true}>
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

              <Field
                defaultValue={event && event.cost}
                component={CostInput}
                name='cost'
              />

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

              <Field component={EventFormPhoto} name='photo' />
              {touched.photo && errors.hasOwnProperty('photo') && (
                <Alert className='mt-3' variant='danger'>
                  {errors.photo}
                </Alert>
              )}
              {event && event.photo !== undefined && values.photo.src === undefined && (
                <EventFormImage src={event.photo.photoURL} />
              )}
            </Form>
          </fieldset>
          {event && event.id && (
            <Form.Label style={{ marginTop: '2rem' }}>Cancel Event</Form.Label>
          )}
          {location.pathname !== '/create-event' && (
            <Form.Check
              name='cancelled'
              onChange={() => {
                setFieldValue('cancelled', !values.cancelled);
              }}
              type='switch'
              id='custom-switch'
              checked={values.cancelled}
              label={''}
            />
          )}
          <EventFormButtons>
            <EventFormSubmitBtn form='eventForm' type='submit'>
              {isSubmitting ? (
                <Spinner animation='border' size='sm' variant='light' />
              ) : event && event.id ? (
                '＋'
              ) : (
                '＋'
              )}
            </EventFormSubmitBtn>
          </EventFormButtons>
        </EventFormContainer>
      );
  }
}

const formikEventForm = withFormik({
  mapPropsToValues: (props) => {
    const { event, location } = props;

    let fieldValuesJSON;
    let fieldValuesParsed;

    if(location.pathname === '/create-event') {
      fieldValuesJSON = localStorage.getItem('createEventFieldValues');
      if(fieldValuesJSON) {
        fieldValuesParsed = JSON.parse(fieldValuesJSON);
      }
    } else if(location.pathname === `/manage-event/${event.id}`) {
      fieldValuesJSON = localStorage.getItem('editEventFieldValues');
      fieldValuesParsed = JSON.parse(fieldValuesJSON);
    }

    if (event !== null) {
      return {
        title: (fieldValuesParsed && fieldValuesParsed.title) || event.title,
        summary: (fieldValuesParsed && fieldValuesParsed.summary) || event.summary,
        description: (fieldValuesParsed && fieldValuesParsed.description) || event.description,
        date:
          (fieldValuesParsed && new Date(fieldValuesParsed.date)) || fromUnixTime(event.date.seconds),
        city: (fieldValuesParsed && fieldValuesParsed.city) || event.city,
        venue: (fieldValuesParsed && fieldValuesParsed.venue) || event.venue,
        category: (fieldValuesParsed && fieldValuesParsed.category) || event.category,
        cost: (fieldValuesParsed && fieldValuesParsed.cost) ||event.cost,
        cancelled: (fieldValuesParsed && fieldValuesParsed.cancelled) || event.cancelled,
        photo: event.photo,
      };
    } else {
      return {
        title: (fieldValuesParsed && fieldValuesParsed.title) || '',
        summary: (fieldValuesParsed && fieldValuesParsed.summary) || '',
        description: (fieldValuesParsed && fieldValuesParsed.description) || '',
        date:
          (fieldValuesParsed && new Date(fieldValuesParsed.date)) ||
          addDays(new Date(), 1),
        city: (fieldValuesParsed && fieldValuesParsed.city) || '',
        venue: (fieldValuesParsed && fieldValuesParsed.venue) || '',
        category: (fieldValuesParsed && fieldValuesParsed.category) || '',
        cost: (fieldValuesParsed && fieldValuesParsed.cost) || 0,
        cancelled: false,
        photo: '',
      };
    }
  },
  validationSchema: Yup.object().shape({
    title: Yup.string()
      .min(4, 'Your event must have a title of at least 4 characters.')
      .required('You must provide the title of your event.'),
    summary: Yup.string()
      .min(6, 'Your event must have a summary of at least 10 characters.')
      .required('You must provide a summary of your event.'),
    description: Yup.string()
      .max(500, 'Too long!')
      .min(6, 'Too short!')
      .required('You must provide a description of your event.'),
    category: Yup.string().required('Event description is required.'),
    city: Yup.string().required(
      'You must provide the city or town of your event.'
    ),
    venue: Yup.string().required('You must provide an event venue.'),
    date: Yup.date().required('Please provide and event date.').nullable(),
    photo: Yup.string().required('Please add a photo for your event.'),
  }),
  handleSubmit: async (values, formikBag) => {
    const {
      event,
      location,
      history,
      createEvent,
      editEvent,
      eventPhotoUpload,
    } = formikBag.props;

    const clearLocalStorage = (items) => {
      if(typeof items === Array) {
        items.forEach(item => {
          localStorage.removeItem(item);
        })
      } else {
        localStorage.removeItem(items);
      }
    }

    if (location.pathname === '/create-event') {
      try {
        const newEvent = {
          ...values,
          coordinates: new firebase.firestore.GeoPoint(
            coords.venue.lat,
            coords.venue.lng
          ),
        };
        let createdEventId = await createEvent(newEvent);
        await eventPhotoUpload(values.photo, createdEventId, true);
        clearLocalStorage(['createEventFieldValues', 'coords']);
        history.push(`/event/${createdEventId}`);
      } catch (err) {
        console.log(err);
      }
    } else {
      const editedEvent = {
        ...event,
        ...values,
      };
      try {
        let editedEventId = await editEvent(editedEvent);
        if (values.photo.src) {
          await eventPhotoUpload(values.photo, editedEventId, false);
          clearLocalStorage(['editEventFieldValues']);
          history.push(`/event/${editedEvent.id}`);
        } else {
          history.push(`/event/${editedEvent.id}`);
        }
      } catch (err) {
        console.log(err);
        history.push(`/manage-event/${editedEvent.id}`);
        toast.error(
          <Notification>
            <NotificationIcon src='/assets/notification.png' />
            There has been an error uploading event photo. Please try again.
          </Notification>,
          {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: true,
          }
        );
      }
    }
  },
})(EventForm);

const eventSelector = (state, data) => {
  if (data === undefined) {
    return null;
  } else {
    return state.events.events.find((event) => event.id === data);
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    event: eventSelector(state, ownProps.match.params.id),
    isSubmitting: state.async.submitting,
  };
};

const mapDispatchToProps = {
  createEvent,
  editEvent,
  eventPhotoUpload,
};

export default connect(mapStateToProps, mapDispatchToProps)(formikEventForm);
