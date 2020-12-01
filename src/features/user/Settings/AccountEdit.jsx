import React from 'react';
import styled from 'styled-components';
import { Form, Spinner, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Field, FieldArray, withFormik } from 'formik';
import { fromUnixTime } from 'date-fns';
import TextInput from '../../../app/form-inputs/TextInput';
import DatePickerInput from '../../../app/form-inputs/DatePickerInput';
import PlaceInput from '../../../app/form-inputs/PlaceInput';
import RichText from '../../../app/form-inputs/RichText';
import CheckboxInput from '../../../app/form-inputs/CheckboxInput';
import { updateProfile } from '../../../app/redux/actions/userActions';


const UpdateProfileBtn = styled(Button)`
  height: 3rem;
  width: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditProfile = ({ handleSubmit, submitting }) => {
  return (
    <div>
      <h4>Profile</h4>
      <p>Add information about yourself</p>
      <Form onSubmit={handleSubmit}>
        <Field name='name' as={TextInput} placeholder='Enter your name' />
        <Field name='occupation' as={TextInput} placeholder='Enter your occupation' />
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
        <Field component={RichText} name='about' />
        <FieldArray component={CheckboxInput} name='interests' />
        <UpdateProfileBtn className='mt-5' type='submit'>
          {submitting ? (<Spinner animation='border' size='sm' variant='light' />) : 'Update profile'}
        </UpdateProfileBtn>
      </Form>
    </div>
  );
};

const formikEditProfile = withFormik({
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
})(EditProfile);

const mapStateToProps = state => {
  return {
    submitting: state.async.submitting
  }
}

const mapDispatchToProps = {
  updateProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(formikEditProfile);
