import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container, Button, Form } from 'react-bootstrap';

export const SignupContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const SignupForm = styled(Form)`
  margin-top: 4rem;
  width: 24rem;
`;

export const SignupFormHeader = styled.h3`
  padding-bottom: 2rem;
  color: #222;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
`;

export const GoogleButton = styled(Button)`
  font-size: 0.9rem !important;
  font-weight: 600 !important;
`;

export const AccountMessage = styled.div`
  font-size: 0.8rem;
  text-align: center;
  margin-top: 4rem;
  font-weight: 500;
`;

export const AccountMessageLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`;
