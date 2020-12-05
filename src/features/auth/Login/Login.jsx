import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { withFormik, Field } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../../app/form-inputs/TextInput';
import {
  login,
  logInWithGoogle,
  clearLoginErrMsg,
} from '../../../app/redux/actions/authActions';


const LoginContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled(Form)`
  transform: translateY(8rem);
  width: 24rem;
`;

const LoginFormHeader = styled.h3`
  padding-bottom: 2rem;
  color: #222;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
`;

const GoogleButton = styled(Button)`
  font-size: .9rem !important;
  font-weight: 500 !important;
  text-decoration: none;
  border: 2px solid #f0f0f0;
  background: #ffffff;
  height: 40px;
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
      <LoginForm className='auth-form' onSubmit={handleSubmit}>
        <LoginFormHeader>Log in</LoginFormHeader>
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
          <Button
            style={{background: '#ff6e5c', border: 'none'}}
            block
            type='submit'
          >
            {isLoggingIn ? <Spinner animation='border' size='sm' /> : 'Log in'}
          </Button>
        </div>
        <div className='mt-4 mb-2' style={{ textAlign: 'center' }}>
          or
        </div>
        <hr className='mt-4 mb-5' />
        <GoogleButton
          onClick={handleClick}
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
              <span id='google-login' className='ml-2'>
                Log in with Google
              </span>
            </span>
          )}
        </GoogleButton>
        <AccountMessage>
          <span className='mr-2'>New to Devents?</span>
          <AccountMessageLink
            onClick={() => clearLoginErrMsg()}
            className='accnt-msg-link'
            to={'/signup'}
          >
            Create an account
          </AccountMessageLink>
        </AccountMessage>
      </LoginForm>
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
  handleSubmit: async (values, { props: { history, login } }) => {
    const loginSuccess = await login(values);
    if (loginSuccess) {
      history.push('/');
    }
  },
})(Login);

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
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
