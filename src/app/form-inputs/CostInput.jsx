import React from 'react';
import { Form } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input-field';

const CostInput = (props) => {
  const { form, field } = props;
  const handleChange = (value) => {
    form.setFieldValue('cost', value);
  };
  return (
    <Form.Group>
      <Form.Label>Event cost</Form.Label>
      <Form.Control
        {...props}
        as={CurrencyInput}
        id='input-example'
        placeholder='£0'
        defaultValue={field.value}
        allowDecimals={true}
        decimalsLimit={2}
        onChange={handleChange}
      />
    </Form.Group>
  );
};

export default CostInput;
