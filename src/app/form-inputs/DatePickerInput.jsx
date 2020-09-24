import React from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FormLabel } from '../styled/global/forms/forms';

const DatePickerInput = (props) => {
  const {field, form} = props;
  const handleChange = (date) => form.setFieldValue(field.name, date);
  const date = new Date();
  return (
    <Form.Group>
      <FormLabel>
        {field.name === 'date' ? 'Event date' : 'Date of birth'}
      </FormLabel>
      <div>
        <Form.Control
          {...props}
          onBlur={(e) => {
            form.setFieldTouched(field.name, 'true');
          }} 
          minDate={field.name === 'date' ? date.setDate(date.getDate() + 1) : null}
          as={DatePicker}
          selected={field.value}
          onChange={handleChange}
          showTimeSelect={field.name === 'date' ? true : false}
          dateFormat={field.name === 'date' ? 'MMMM d, h:mm aa' : 'MMMM d Y'}
          showYearDropdown={field.name === 'dob' ? true : false}
          showMonthDropdown
        />
      </div>
    </Form.Group>
  );
};

export default DatePickerInput;
