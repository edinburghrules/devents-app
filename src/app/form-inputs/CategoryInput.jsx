import React from 'react';
import { Form } from 'react-bootstrap';

const categoryOptions = [
  {key: null, text: 'Select event category', value: null},
  {key: 'web', text: 'Web Development', value: 'web', name: 'web'},
  {key: 'mobile', text: 'Mobile development', value: 'mobile', name: 'mobile'},
  {key: 'game', text: 'Game development', value: 'game', name: 'game'},
  {key: 'machine', text: 'Machine Learning and AI', value: 'machine', name: 'machine'},
  {key: 'database', text: 'Database engineer', value: 'database', name: 'database'},
  {key: 'desktop', text: 'Desktop programming', value: 'desktop', name: 'desktop'}
]

const CategoryInput = (props) => {
  const {
    field,
    form
  } = props;

  const handleChange = (e) => {
    form.setFieldValue(field.name, e.target.value);
  }

  return (
    <Form.Group>
      <Form.Label>Event Category</Form.Label>
      <Form.Control value={field.value}  onChange={handleChange} as='select'>
        {categoryOptions.map(option => {
          return (
            <option {...option}>{option.text}</option>
          )
        })}
      </Form.Control>
    </Form.Group>
  )
}

export default CategoryInput
