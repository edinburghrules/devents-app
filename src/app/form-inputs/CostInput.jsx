import React from 'react';
import { Form } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input-field';
import { FormLabel } from '../styled/global/forms/forms';

const CostInput = (props) => {
  const { form, field } = props;

  const handleChange = (value) => {
    form.setFieldValue(field.name, value);
  };

  return (
    <Form.Group>
      <FormLabel>Event cost</FormLabel>
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
