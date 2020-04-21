import React from 'react';
import { Form } from 'react-bootstrap';

const TextAreaInput = (props) => {
  return (
    <Form.Group>
      <Form.Label>Event description</Form.Label>
      <Form.Control as='textarea' {...props}/>
    </Form.Group>
  )

};

export default TextAreaInput;
