import React from 'react';
import { Alert, Form, Button } from 'react-bootstrap';
import { withFormik, Field } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../../app/form-inputs/TextInput';
import { editPassword } from '../../../app/redux/actions/profileActions';

const AccountPage = ({ handleSubmit, errors, touched, providerId }) => {
  if (providerId === 'password') {
    return (
      <div>
        <h2>Account Page</h2>
        <Form onSubmit={handleSubmit}>
          <Field name='newpassword' as={TextInput} type='password' />
          {touched.newpassword && errors.hasOwnProperty('newpassword') && (
            <Alert variant='danger'>{errors.newpassword}</Alert>
          )}
          <Field name='confirmpassword' as={TextInput} type='password' />
          {touched.confirmpassword &&
            errors.hasOwnProperty('confirmpassword') && (
              <Alert variant='danger'>{errors.confirmpassword}</Alert>
            )}
          {errors.hasOwnProperty('error') && (
            <Alert variant='danger'>{errors.error}</Alert>
          )}
          <Button type='submit'>Update password</Button>
        </Form>
      </div>
    );
  } else if (providerId === 'google.com') {
    return (
      <div>
        <h3 className='mb-4'>Change Password</h3>
        <h6>Google Account</h6>
        <p>
          Please click the button below to visit your Google profile and change
          your password.
        </p>
        <Button
          href='https://myaccount.google.com/personal-info'
          target='_blank'
          rel='noopener noreferrer'
          className='google-btn'
          variant='light'
        >
          <img className='mr-1' src='/assets/google.png' alt='google logo' />
          Google
        </Button>
      </div>
    );
  }
};

const formikAccountPage = withFormik({
  mapPropsToValues: () => ({
    newpassword: '',
    confirmpassword: '',
  }),
  validationSchema: Yup.object().shape({
    newpassword: Yup.string().required('Please provide a new password'),
    confirmpassword: Yup.string().required('Please confirm your new password'),
  }),
  handleSubmit: (values, { setErrors }) => {
    if (values.newpassword === values.confirmpassword) {
      editPassword(values.newpassword);
    } else {
      setErrors({ error: 'Passwords do not match!' });
    }
  },
})(AccountPage);

export default formikAccountPage;
