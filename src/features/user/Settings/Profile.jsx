import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Field, FieldArray, withFormik } from 'formik';
import { fromUnixTime } from 'date-fns';
import TextInput from '../../../app/form-inputs/TextInput';
import DatePickerInput from '../../../app/form-inputs/DatePickerInput';
import PlaceInput from '../../../app/form-inputs/PlaceInput';
import TextAreaInput from '../../../app/form-inputs/TextAreaInput';
import CheckboxInput from '../../../app/form-inputs/CheckboxInput';
import { updateProfile } from '../../../app/redux/actions/authActions';

const mapDispatchToProps = {
  updateProfile,
};

const Profile = ({ handleSubmit, values }) => {
  console.log(values)
  return (
    <div>
      <h2>Profile</h2>
      <p>Add information about yourself</p>
      <Form onSubmit={handleSubmit}>
        <Field name='name' as={TextInput} placeholder='Enter your name' />
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
        <Field 
          as={TextAreaInput} 
          name='about' 
        />
        <FieldArray 
          component={CheckboxInput}
          name='interests' 
        />
        <Button type='submit'>Update profile</Button>
      </Form>
    </div>
  );
};

const formikProfile = withFormik({
  mapPropsToValues: ({ user }) => {
    if (user) {
      return {
        name: user.displayName,
        dob: user.dob ? fromUnixTime(user.dob.seconds) : null,
        homeCity: user.homeCity ? user.homeCity : '',
        about: user.about ? user.about : '',
        interests: user.interests ? user.interests : []
      };
    } else {
      return {
        name: '',
        dob: null,
        homeCity: '',
        about: '',
        interests: []
      };
    }
  },
  handleSubmit: (values, { props: { updateProfile } }) => {
    console.log(values)
    updateProfile(values);
  },
})(Profile);

export default connect(null, mapDispatchToProps)(formikProfile);
