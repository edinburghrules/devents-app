import styled from 'styled-components';
import { Container, Button } from 'react-bootstrap';

export const EventFormContainer = styled(Container)`
  margin: 10rem auto;
`;

export const EventFormHeading = styled.h2`
  margin-bottom: 3rem;
  font-weight: 600;
  color: #222;
`;

export const EventFormButtons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const EventFormSubmitBtn = styled(Button)`
  height: 2.8rem;
  width: 10rem;
`;
