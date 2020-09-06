import React from 'react';
import { FormLabel } from '../styled/global/forms/forms';
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
      <FormLabel>
        {props.name === 'title' || props.name === 'summary'
          ? ` Event ${props.name}`
          : capitalise(props.name)}
      </FormLabel>
      <Form.Control {...props} />
    </Form.Group>
  );
};

export default TextInput;
