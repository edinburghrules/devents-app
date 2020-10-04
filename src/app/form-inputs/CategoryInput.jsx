import React from 'react';
import { Form } from 'react-bootstrap';
import {FormLabel} from '../styled/global/forms/forms';

export const categoryOptions = [
  { key: null, text: 'Select event category', value: null },
  { key: 'web', text: 'Web Development', value: 'web', name: 'web', img: 'assets/web.png' },
  {
    key: 'mobile',
    text: 'Mobile development',
    value: 'mobile',
    name: 'mobile',
    img: 'assets/mobile.jpg'
  },
  { key: 'game', text: 'Game development', value: 'game', name: 'game', img: 'assets/game.png' },
  {
    key: 'machine',
    text: 'Machine Learning and AI',
    value: 'machine',
    name: 'machine',
    img: 'assets/machine.jpeg'
  },
  {
    key: 'database',
    text: 'Database engineer',
    value: 'database',
    name: 'database',
    img: 'assets/db.jpg'
  },
  {
    key: 'desktop',
    text: 'Desktop programming',
    value: 'desktop',
    name: 'desktop',
    img: 'assets/software.jpg'
  },
];

const CategoryInput = (props) => {
  const { field, form } = props;

  const handleChange = (e) => {
    form.setFieldValue(field.name, e.target.value);
  };

  return (
    <Form.Group>
      <FormLabel>Event Category</FormLabel>
      <Form.Control value={field.value} onChange={handleChange} as='select'>
        {categoryOptions.map((option) => {
          return <option {...option}>{option.text}</option>;
        })}
      </Form.Control>
    </Form.Group>
  );
};

export default CategoryInput;
