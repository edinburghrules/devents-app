import React from 'react';
import { Form } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input-field';

const CostInput = (props) => {
  console.log(props)
  const { form, field } = props;

  const handleChange = (value) => {
    form.setFieldValue(field.name, value);
  };

  return (
    <Form.Group>
      <Form.Label>Event cost</Form.Label>
        <CurrencyInput
          
          className='form-control'
          {...props}
          id='input-example'
          placeholder='£0.00'
          allowDecimals={true}
          decimalsLimit={2}
          onChange={handleChange}
          prefix='£'
        />
    </Form.Group>
  );
};

export default CostInput;
