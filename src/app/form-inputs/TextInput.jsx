import React from 'react';
import { Form } from 'react-bootstrap';

const TextInput = (props) => {
  const capitalise = (inputName) => {
    if (inputName === 'firstName') {
      return 'First name';
    } else if (inputName === 'lastName') {
      return 'Last name';
    } else if (inputName === 'confirmpassword' || inputName === 'newpassword') {
      return (
        inputName.charAt(0).toUpperCase() +
        inputName.slice(1, inputName.indexOf('p')) +
        ' ' +
        inputName.slice(inputName.indexOf('p'))
      );
    } else {
      return inputName.charAt(0).toUpperCase() + inputName.slice(1);
    }
  };

  return (
    <Form.Group>
      <Form.Label>
        {props.name === 'title' || props.name === 'summary'
          ? ` Event ${props.name}`
          : capitalise(props.name)}
      </Form.Label>
      <Form.Control {...props} />
    </Form.Group>
  );
};

export default TextInput;
