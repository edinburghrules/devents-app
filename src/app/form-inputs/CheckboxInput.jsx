import React from 'react';
import { Form } from 'react-bootstrap';
import { FormLabel } from '../styled/global/forms/forms';
import { CheckBoxContainer, CheckBox } from '../styled/global/forms/forms';

const interestOptions = [
  { name: 'interests', text: 'Frontend Web Development' },
  { name: 'interests', text: 'Backend Web Development' },
  { name: 'interests', text: 'Fullstack Web Development' },
  { name: 'interests', text: 'Data Science' },
  { name: 'interests', text: 'AI and Machine Learning' },
  { name: 'interests', text: 'Mobile Application Development' },
  { name: 'interests', text: 'Programming Languages' },
  { name: 'interests', text: 'General Technology' },
];

const CheckboxInput = (props) => {
  const handleChange = (e) => {
    if (e.target.checked) {
      props.push(e.target.name);
    } else {
      const index = props.form.values.interests.indexOf(e.target.name);
      props.remove(index);
    }
  };
  return (
    <CheckBoxContainer>
      <Form.Group>
        <FormLabel>Interests</FormLabel>
        {interestOptions.map((option, i) => {
          return (
            <CheckBox
              onChange={handleChange}
              checked={props.form.values.interests.includes(option.text)}
              name={option.text}
              key={i}
              type='checkbox'
              label={option.text}
            />
          );
        })}
      </Form.Group>
    </CheckBoxContainer>
  );
};

export default CheckboxInput;
