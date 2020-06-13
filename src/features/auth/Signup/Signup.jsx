import React from 'react';
import { connect } from 'react-redux';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {withFormik, Field} from 'formik';
import * as Yup from 'yup';
import TextInput from '../../../app/form-inputs/TextInput';
import { signUp } from '../../../app/redux/actions/authActions';

const Login = ({
  handleSubmit,
  touched,
  errors,
  errorMsg
}) => {
  return (
    <Container className='login-container'>
        <Form className='auth-form' onSubmit={handleSubmit}>
        <h3 className='auth-header'>Sign up</h3>
        <Field name='firstName' as={TextInput} type='text' placeholder='Enter your first name'/>
        {(touched.firstName && errors.firstName) && <Alert variant='danger'>{errors.firstName}</Alert>}
        <Field name='lastName' as={TextInput} type='text' placeholder='Enter your last name'/>
        {(touched.lastName && errors.lastName) && <Alert variant='danger'>{errors.lastName}</Alert>}
        <Field name='email' as={TextInput} type='email' placeholder='Enter your email'/>
        {(touched.email && errors.email) && <Alert variant='danger'>{errors.email}</Alert>}
        <Field name='password' as={TextInput} type='password' placeholder='Enter your password'/>
        {(touched.password && errors.password) && <Alert variant='danger'>{errors.password}</Alert>}
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
          <div className='m-right'>
            <Button block variant='success' type='submit'>
              Sign up
            </Button>
          </div>
          <div className='accnt-msg'>
          <span className='mr-2'>Already got an account?</span>
          <Link className='accnt-msg-link' to={'/login'}>Log in</Link>
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
    password: ''
  }),
  validationSchema: Yup.object().shape({
    firstName: Yup.string().required('You must provide your first name'),
    lastName: Yup.string().required('You must provide your last name'),
    email: Yup.string().email().required('You must provide your email address'),
    password: Yup.string().min(6, 'Password must be at least 6 characters.').required('You must enter a password')
  }),
  handleSubmit: (values, {props}) => {
    props.signUp({
      firstName: values.firstName.toLowerCase().charAt(0).toUpperCase() + values.firstName.slice(1),
      lastName: values.lastName.toLowerCase().charAt(0).toUpperCase() + values.lastName.slice(1),
      email: values.email,
      password: values.password
    }, props.history)
  }
})(Login)

const mapStateToProps = state => {
  return {
    errorMsg: state.user.errMsg
  }
}

const mapDispatchToProps = {
  signUp
}

export default connect(mapStateToProps, mapDispatchToProps)(formikLogin);
