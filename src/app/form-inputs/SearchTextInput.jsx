import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const SearchTextInput = (props) => {
  return (
    <Form.Group>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>
            <span role='img' aria-labelledby='glass icon'>
              🔎
            </span>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control {...props}></Form.Control>
      </InputGroup>
    </Form.Group>
  );
};

export default SearchTextInput;
