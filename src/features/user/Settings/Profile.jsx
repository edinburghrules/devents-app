import React from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Field, FieldArray, withFormik } from 'formik';
import { fromUnixTime } from 'date-fns';
import TextInput from '../../../app/form-inputs/TextInput';
import DatePickerInput from '../../../app/form-inputs/DatePickerInput';
import PlaceInput from '../../../app/form-inputs/PlaceInput';
import TextAreaInput from '../../../app/form-inputs/TextAreaInput';
import CheckboxInput from '../../../app/form-inputs/CheckboxInput';
import { updateProfile } from '../../../app/redux/actions/profileActions';

const Profile = ({ handleSubmit, submitting }) => {
  return (
    <div>
      <h2>Profile</h2>
      <p>Add information about yourself</p>
      <Form onSubmit={handleSubmit}>
        <Field name='name' as={TextInput} placeholder='Enter your name' />
        <Field name='occupation' as={TextInput} placeholder='Enter your name' />
        <Field
          component={DatePickerInput}
          name='dob'
          placeholderText='Enter your date of birth'
        />
        <Field
          component={PlaceInput}
          name='homeCity'
          searchOptions={{ types: ['(cities)'] }}
        />
        <Field as={TextAreaInput} name='about' />
        <FieldArray component={CheckboxInput} name='interests' />
        <Button type='submit'>
          {submitting ? (<Spinner animation='border' size='sm' variant='light' />) : 'Update profile'}
        </Button>
      </Form>
    </div>
  );
};

const formikProfile = withFormik({
  mapPropsToValues: ({ profile }) => {
    if (profile) {
      return {
        name: profile.displayName,
        occupation: profile.occupation ? profile.occupation : '',
        dob: profile.dob ? fromUnixTime(profile.dob.seconds) : null,
        homeCity: profile.homeCity ? profile.homeCity : '',
        about: profile.about ? profile.about : '',
        interests: profile.interests ? profile.interests : [],
      };
    } else {
      return {
        name: '',
        occupation: '',
        dob: null,
        homeCity: '',
        about: '',
        interests: [],
      };
    }
  },
  handleSubmit: (values, { props: { updateProfile } }) => {
    updateProfile(values);
  },
})(Profile);

const mapStateToProps = state => {
  return {
    submitting: state.async.submitting
  }
}

const mapDispatchToProps = {
  updateProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(formikProfile);
