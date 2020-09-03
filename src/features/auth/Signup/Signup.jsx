import React from 'react';
import { connect } from 'react-redux';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withFormik, Field } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../../app/form-inputs/TextInput';
import {
  signUp,
  clearLoginErrMsg,
} from '../../../app/redux/actions/authActions';

const Login = ({
  handleSubmit,
  touched,
  errors,
  error,
  setFieldValue,
  clearLoginErrMsg,
  isSigningUp,
}) => {
  const handleChange = (e) => {
    setFieldValue(e.target.name, e.target.value, true);
    clearLoginErrMsg();
  };
  return (
    <Container className='login-container'>
      <Form className='auth-form' onSubmit={handleSubmit}>
        <h3 className='auth-header'>Sign up</h3>
        <Field
          name='firstName'
          as={TextInput}
          type='text'
          placeholder='Enter your first name'
          isInvalid={touched.firstName && errors.hasOwnProperty('firstName')}
          isValid={touched.firstName && !errors.hasOwnProperty('firstName')}
        />
        <Field
          name='lastName'
          as={TextInput}
          type='text'
          placeholder='Enter your last name'
          isInvalid={touched.lastName && errors.hasOwnProperty('lastName')}
          isValid={touched.lastName && !errors.hasOwnProperty('lastName')}
        />

        <Field
          name='email'
          as={TextInput}
          type='email'
          placeholder='Enter your email'
          onChange={handleChange}
          isInvalid={
            (error !== null && error.includes('email')) ||
            (touched.email && errors.hasOwnProperty('email'))
          }
          isValid={touched.email && !errors.hasOwnProperty('email')}
        />

        <Field
          name='password'
          as={TextInput}
          type='password'
          placeholder='Enter your password'
          isInvalid={touched.password && errors.hasOwnProperty('password')}
          isValid={touched.password && !errors.hasOwnProperty('password')}
        />

        {error && <Alert variant='danger'>{error}</Alert>}
        <div className='m-right'>
          <Button block variant='success' type='submit'>
            {isSigningUp ? <Spinner animation='border' size='sm' /> : 'Sign up'}
          </Button>
        </div>
        <div className='accnt-msg'>
          <span className='mr-2'>Already got an account?</span>
          <Link className='accnt-msg-link' to={'/login'}>
            Log in
          </Link>
        </div>
      </Form>
    </Container>
  );
};

const formikLogin = withFormik({
  mapPropsToValues: () => ({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }),
  validationSchema: Yup.object().shape({
    firstName: Yup.string().required('You must provide your first name'),
    lastName: Yup.string().required('You must provide your last name'),
    email: Yup.string().email().required('You must provide your email address'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters.')
      .required('You must enter a password'),
  }),
  handleSubmit: async (values, { props: {signUp, history} }) => {
    const getUserIdAfterSignUp = await signUp(
      {
        firstName:
          values.firstName.toLowerCase().charAt(0).toUpperCase() +
          values.firstName.slice(1),
        lastName:
          values.lastName.toLowerCase().charAt(0).toUpperCase() +
          values.lastName.slice(1),
        email: values.email,
        password: values.password,
      }
    );
    history.push(`/user/${getUserIdAfterSignUp}`)
  },
})(Login);

const mapStateToProps = (state) => {
  return {
    error: state.user.error,
    isSigningUp: state.async.authorised,
  };
};

const mapDispatchToProps = {
  signUp,
  clearLoginErrMsg,
};

export default connect(mapStateToProps, mapDispatchToProps)(formikLogin);
