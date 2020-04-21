import React from 'react';
import { Form } from 'react-bootstrap';

const TextInput = (props) => {
  return (
    <Form.Group>
      <Form.Label>Event title</Form.Label>
      <Form.Control {...props}/>
    </Form.Group>
  )
}

export default TextInput;