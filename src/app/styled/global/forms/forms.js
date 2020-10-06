import styled from 'styled-components';
import { Form, InputGroup } from 'react-bootstrap';

export const FormLabel = styled(Form.Label)`
  font-size: 0.8rem;
  font-weight: 600;
  color: #222;
`;

export const CheckBoxContainer = styled.div`
  font-size: 1rem;
`;

export const CheckBox = styled(Form.Check)`
  margin-bottom: 0.8rem;
  font-size: 0.95rem;
`;

export const SearchTextCard = styled.div`
  box-shadow: 0 4px 2px -2px #e0e0e0;
  background: #fff;
  margin: -4.5rem 0 5rem 0;
  padding: 30px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SearchIcon = styled.img`
  width: 15px;
`;

export const SearchTextContainer = styled(Form.Group)`
  margin: 0;
  width: 100%;
`;

export const SearchTextField = styled(InputGroup)`
  width: 100%;
  & > * {
    height: 50px;
  }
`;
