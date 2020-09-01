import React from 'react';
import { Form } from 'react-bootstrap';

const TextAreaInput = (props) => {
  return (
    <Form.Group>
      <Form.Label>
        {props.name === 'about' ? 'About you' : `Event ${props.name}`}{' '}
      </Form.Label>
      <Form.Control as='textarea' {...props} />
    </Form.Group>
  );
};

export default TextAreaInput;
