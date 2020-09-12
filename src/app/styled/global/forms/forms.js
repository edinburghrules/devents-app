import styled from 'styled-components';
import { Form } from 'react-bootstrap';

export const FormLabel = styled(Form.Label)`
  font-size: 0.8rem;
  font-weight: 600;
  color: #222;
`;

export const CheckBoxContainer = styled.div`
  font-size: 1rem;
`;

export const CheckBox = styled(Form.Check)`
  margin-bottom: .8rem;
  font-size: .95rem;
`;
