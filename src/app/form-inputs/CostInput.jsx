import React from 'react';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input-field';

const FormLabel = styled(Form.Label)`
  font-size: 0.8rem;
  font-weight: 600;
  color: #222;
`;

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
