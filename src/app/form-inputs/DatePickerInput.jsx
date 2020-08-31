import React from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerInput = (props) => {
  const {field, form} = props;
  const handleChange = (date) => form.setFieldValue(field.name, date);
  return (
    <Form.Group>
      <Form.Label>
        {field.name === 'date' ? 'Event date' : 'Date of birth'}
      </Form.Label>
      <div>
        <Form.Control
          {...props}
          onBlur={(e) => {
            form.setFieldTouched(field.name, 'true');
          }} 
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
