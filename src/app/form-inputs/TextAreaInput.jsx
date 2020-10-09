import React from 'react';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';

const FormLabel = styled(Form.Label)`
  font-size: 0.8rem;
  font-weight: 600;
  color: #222;
`;

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
