import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Alert, Spinner, Container, Form } from 'react-bootstrap';
import { withFormik, Field } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../../app/form-inputs/TextInput';
import {
  signUp,
  clearLoginErrMsg,
} from '../../../app/redux/actions/authActions';

const SignupContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SignupForm = styled(Form)`
  margin-top: 4rem;
  width: 24rem;
`;

const SignupFormHeader = styled.h3`
  padding-bottom: 2rem;
  color: #222;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
`;

const AccountMessage = styled.div`
  font-size: 0.8rem;
  text-align: center;
  margin-top: 4rem;
  font-weight: 500;
`;

const AccountMessageLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`;

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
    <SignupContainer>
      <SignupForm className='auth-form' onSubmit={handleSubmit}>
        <SignupFormHeader>Sign up</SignupFormHeader>
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
        <div className='m-right mt-5'>
          <Button
            style={{ background: '#ff6e5c', border: 'none' }}
            block
            type='submit'
          >
            {isSigningUp ? <Spinner animation='border' size='sm' /> : 'Sign up'}
          </Button>
        </div>
        <AccountMessage>
          <span className='mr-2'>Already got an account?</span>
          <AccountMessageLink className='accnt-msg-link' to={'/login'}>
            Log in
          </AccountMessageLink>
        </AccountMessage>
      </SignupForm>
    </SignupContainer>
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
  handleSubmit: async (values, { props: { signUp, history } }) => {
    const getUserIdAfterSignUp = await signUp({
      firstName:
        values.firstName.toLowerCase().charAt(0).toUpperCase() +
        values.firstName.slice(1),
      lastName:
        values.lastName.toLowerCase().charAt(0).toUpperCase() +
        values.lastName.slice(1),
      email: values.email,
      password: values.password,
    });
    history.push(`/user/${getUserIdAfterSignUp}`);
  },
})(Login);

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    isSigningUp: state.async.authorizing,
  };
};

const mapDispatchToProps = {
  signUp,
  clearLoginErrMsg,
};

export default connect(mapStateToProps, mapDispatchToProps)(formikLogin);
