import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const Signup = () => {
  return (
    <Container className='login-container'>
      <Form className='auth-form'>
        <h3 className='auth-header'>Sign up</h3>
        <Form.Group controlId='formBasicFirstName'>
          <Form.Label className='label'>First name</Form.Label>
          <Form.Control type='text'/>
        </Form.Group>
        <Form.Group controlId='formBasicLastName'>
          <Form.Label className='label'>Last name</Form.Label>
          <Form.Control type='text' />
        </Form.Group>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label className='label'>Email address</Form.Label>
          <Form.Control type='email' />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label className='label'>Password</Form.Label>
          <Form.Control type='password'/>
        </Form.Group>
        <div className='m-right'>
          <Button variant='success'>
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Signup;
