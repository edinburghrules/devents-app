import React from 'react';
import { Form } from 'react-bootstrap';
import { FormLabel } from '../styled/global/forms/forms';

const TextAreaInput = (props) => {
  return (
    <Form.Group>
      <FormLabel>
        {props.name === 'about' ? 'About you' : `Event ${props.name}`}{' '}
      </FormLabel>
      <Form.Control as='textarea' {...props} />
    </Form.Group>
  );
};

export default TextAreaInput;
