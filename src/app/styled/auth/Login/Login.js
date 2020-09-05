import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

export const LoginContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
