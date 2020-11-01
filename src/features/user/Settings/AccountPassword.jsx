import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Alert, Form, Button, Spinner } from 'react-bootstrap';
import { withFormik, Field } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../../app/form-inputs/TextInput';
import { editPassword } from '../../../app/redux/actions/userActions';

const ChangePasswordButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12rem;
  height: 3rem;
  margin-top: 2rem !important;
`;

const GoogleButton = styled(Button)`
  font-size: 0.9rem !important;
  font-weight: 600 !important;
  text-decoration: none;
  border: 2px solid #f0f0f0;
  margin-top: 2rem;
  background: #ffffff;
`;

const ChangePasswordPage = ({
  handleSubmit,
  errors,
  touched,
  providerId,
  submitting, 
  error
}) => {
  if (providerId === 'password') {
    return (
      <div>
        <h4>Account Page</h4>
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
          {error && (<Alert variant='danger'>{error.message}</Alert>)}
          <ChangePasswordButton type='submit'>
            {submitting ? (
              <Spinner animation='border' size='sm' variant='light' />
            ) : (
              'Change password'
            )}
          </ChangePasswordButton>
        </Form>
      </div>
    );
  } else if (providerId === 'google.com') {
    return (
      <div>
        <h4 className='mb-4'>Change Password</h4>
        <h6>Google Account</h6>
        <p>
          Please click the button below to visit your Google profile and change
          your password.
        </p>
        <GoogleButton
          href='https://myaccount.google.com/personal-info'
          target='_blank'
          rel='noopener noreferrer'
          className='google-btn'
          variant='light'
        >
          <img className='mr-1' src='/assets/google.png' alt='google logo' />
          Google
        </GoogleButton>
      </div>
    );
  }
};

const formikChangePasswordPage = withFormik({
  mapPropsToValues: () => ({
    newpassword: '',
    confirmpassword: '',
  }),
  validationSchema: Yup.object().shape({
    newpassword: Yup.string().required('Please provide a new password'),
    confirmpassword: Yup.string().required('Please confirm your new password'),
  }),
  handleSubmit: (values, { setErrors, props: {editPassword} }) => {
    console.log(editPassword)
    if (values.newpassword === values.confirmpassword) {
      editPassword(values.newpassword);
    } else {
      setErrors({ error: 'Passwords do not match!' });
    }
  },
})(ChangePasswordPage);

const mapStateToProps = (state) => {
  return {
    submitting: state.async.submitting,
    error: state.profile.error
  };
};

const mapDispatchToProps = {
  editPassword
}

export default connect(mapStateToProps, mapDispatchToProps)(formikChangePasswordPage);
