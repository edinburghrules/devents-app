import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const EventDashboardHeaderContainer = styled.div`
  height: 80vh;
  background-image: url(./assets/header.jpg);
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const EventDashboardHeaderText = styled.h1`
  font-size: 7rem;
  color: #fff;
  font-weight: 700;
  margin-top: 10rem;
`;

export const EventDashboardHeaderBtn = styled(Button)`
  margin-top: 4rem;
  padding: 1rem 2rem;
  font-size: 1.4rem;
  font-weight: 700;
  background: #2fb47e !important;
  color: #fff !important;
  border: none !important;
  border-radius: 8px;
  border-bottom: 4px solid #555 !important;
`;
