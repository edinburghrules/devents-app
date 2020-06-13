import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Form, Button, Alert} from 'react-bootstrap';
import { withFormik, Field } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../../app/form-inputs/TextInput';
import { login, logInWithGoogle } from '../../../app/redux/actions/authActions';

const Login = ({ handleSubmit, logInWithGoogle, history, errorMsg }) => {
  const handleClick = () => {
    logInWithGoogle(history);
  }
  console.log(errorMsg)
  return (
    <Container className='login-container'>
      <Form className='auth-form' onSubmit={handleSubmit}>
        <h3 className='auth-header'>Log in</h3>
        <Field
          name='email'
          as={TextInput}
          type='email'
          placeholder='Enter your email'
        />
        <Field
          name='password'
          as={TextInput}
          type='password'
          placeholder='Enter your password'
        />
        {errorMsg && <Alert variant='danger'>{errorMsg}</Alert>}
        <div className='m-right mt-5'>
          <Button block variant='success' type='submit'>
            Log in
          </Button>
        </div>
        <div className='mt-4 mb-2' style={{ 'textAlign': 'center' }}>
          or
        </div>
        <hr className='mt-4 mb-5' />
        <Button onClick={handleClick} className='pl-3 pr-3' variant='light' block>
          <img className='mr-1' src='/assets/google.png' alt='google logo' />
          <span className='ml-2'>Log in with google</span>
        </Button>
        <div className='accnt-msg'>
          <span className='mr-2'>New to Devents?</span>
          <Link className='accnt-msg-link' to={'/signup'}>Create an account</Link>
        </div>
      </Form>
    </Container>
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
  handleSubmit: (values, { props }) => {
    const { login, history } = props;
    login(values, history);
  },
})(Login);

const mapStateToProps = state => {
  return {  
    errorMsg: state.user.errMsg
  }
}

const mapDispatchToProps = {
  login,
  logInWithGoogle
};

export default connect(mapStateToProps, mapDispatchToProps)(formikLogin);
