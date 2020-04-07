import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const Login = () => {
  return (
    <Container className='login-container'>
        <Form className='auth-form'>
        <h3 className='auth-header'>Log in</h3>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label className='label'>Email address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' />
            <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId='formBasicPassword'>
            <Form.Label className='label'>Password</Form.Label>
            <Form.Control type='password' placeholder='Password' />
          </Form.Group>
          <div className='m-right'>
            <Button variant='success' type='submit'>
              Submit
            </Button>
          </div>
        </Form>
    </Container>
  );
};

export default Login;
