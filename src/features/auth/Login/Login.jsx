import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { withFormik, Field } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../../app/form-inputs/TextInput';
import {
  login,
  logInWithGoogle,
  clearLoginErrMsg,
} from '../../../app/redux/actions/authActions';
import { LoginContainer, GoogleButton, AccountMessage, AccountMessageLink } from '../../../app/styled/auth/Login/Login';

const Login = ({
  handleSubmit,
  logInWithGoogle,
  clearLoginErrMsg,
  history,
  error,
  errors,
  isLoggingIn,
  isGoogleLoggingIn,
  touched,
  setFieldValue,
}) => {
  const handleClick = async () => {
    await logInWithGoogle('googleLogin');
    history.push('/');
  };
  const handleChange = (e) => {
    setFieldValue(e.target.name, e.target.value, true);
    clearLoginErrMsg();
  };
  return (
    <LoginContainer className='login-container'>
      <Form className='auth-form' onSubmit={handleSubmit}>
        <h3 className='auth-header'>Log in</h3>
        <Field
          name='email'
          as={TextInput}
          type='email'
          placeholder='Enter your email'
          onChange={handleChange}
          isInvalid={
            (error !== null && error.errorType === 'email') ||
            (touched.email && errors.hasOwnProperty('email'))
          }
          isValid={touched.email && !errors.hasOwnProperty('email')}
        />
        <Field
          name='password'
          as={TextInput}
          type='password'
          onChange={handleChange}
          placeholder='Enter your password'
          isInvalid={
            (error !== null && error.errorType === 'password') ||
            (touched.password && errors.hasOwnProperty('password'))
          }
          isValid={touched.password && !errors.hasOwnProperty('password')}
        />
        {error && <Alert variant='danger'>{error.msg || error}</Alert>}
        <div className='m-right mt-5'>
          <Button className='user-login-btn' block variant='success' type='submit'>
            {isLoggingIn ? <Spinner animation='border' size='sm' /> : 'Log in'}
          </Button>
        </div>
        <div className='mt-4 mb-2' style={{ textAlign: 'center' }}>
          or
        </div>
        <hr className='mt-4 mb-5' />
        <GoogleButton
          onClick={handleClick}
          className='pl-3 pr-3 google-btn'
          variant='light'
          block
        >
          {isGoogleLoggingIn ? (
            <Spinner animation='border' size='sm' variant='primary' />
          ) : (
            <span>
              <img
                className='mr-1'
                src='/assets/google.png'
                alt='google logo'
              />
              <span id='google-login' className='ml-2'>Log in with Google</span>
            </span>
          )}
        </GoogleButton>
        <AccountMessage>
          <span className='mr-2'>New to Devents?</span>
          <AccountMessageLink onClick={() => clearLoginErrMsg()}className='accnt-msg-link' to={'/signup'}>
            Create an account
          </AccountMessageLink>
        </AccountMessage>
      </Form>
    </LoginContainer>
  );
};

const formikLogin = withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  }),
  handleSubmit: async (values, { props: {history, login} }) => {
    const loginSuccess = await login(values);
    if(loginSuccess) {
      history.push('/')
    }
  },
})(Login);

const mapStateToProps = (state) => {
  return {
    error: state.user.error,
    isLoggingIn: state.async.authorizing,
    isGoogleLoggingIn: state.async.googleAuthorizing,
  };
};

const mapDispatchToProps = {
  login,
  logInWithGoogle,
  clearLoginErrMsg,
};

export default connect(mapStateToProps, mapDispatchToProps)(formikLogin);
