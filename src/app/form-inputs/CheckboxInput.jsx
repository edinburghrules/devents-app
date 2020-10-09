import React from 'react';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';

const FormLabel = styled(Form.Label)`
  font-size: 0.8rem;
  font-weight: 600;
  color: #222;
`;

const CheckBoxContainer = styled.div`
  font-size: 1rem;
`;

const CheckBox = styled(Form.Check)`
  margin-bottom: 0.8rem;
  font-size: 0.95rem;
`;


const interestOptions = [
  { name: 'interests', text: 'Frontend Web Development' },
  { name: 'interests', text: 'UX Design' },
  { name: 'interests', text: 'UI Design' },
  { name: 'interests', text: 'Backend Web Development' },
  { name: 'interests', text: 'Fullstack Web Development' },
  { name: 'interests', text: 'Mobile Application Development' },
  { name: 'interests', text: 'Software Engineering' },
  { name: 'interests', text: 'Game Development' },
  { name: 'interests', text: 'Data Science' },
  { name: 'interests', text: 'AI and Machine Learning' },
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
