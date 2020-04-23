import React from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerInput = (props) => {
  const {field, form} = props;
  const handleChange = (date) => form.setFieldValue('date', date);
  return (
    <Form.Group>
      <Form.Label>Event date</Form.Label>
      <div>
        <Form.Control
          as={DatePicker}
          selected={field.value}
          onChange={handleChange}
          showTimeSelect
          dateFormat='MMMM d, h:mm aa'
          {...props}
        />
      </div>
    </Form.Group>
  );
};

export default DatePickerInput;
