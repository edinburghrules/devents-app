import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const EventDashboardHeaderContainer = styled.div`
  height: 55vh;
  margin-top: 1rem;
  margin-bottom: -12rem;
  background: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    url(./assets/3495739.jpg);
  background-size: cover;
  background-position-y: 5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const EventDashboardHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 6rem;
  align-items: flex-start;
  margin-top: -4.5rem;
`;

export const EventDashboardHeaderText = styled.h1`
  font-size: 4rem;
  color: #3b4252;
  font-weight: 700;
  letter-spacing: -2px;
  letter-spacing: 1px;
`;

export const EventDashboardHeaderSubText = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: #3b4252;
`;

export const EventDashboardHeaderBtn = styled(Button)`
  margin-top: 1rem;
  padding: .5rem .9rem;
  font-size: .9rem;
  font-weight: 400;
  background: #FF6F61 !important;
  color: #fff !important;
  border-radius: 8px;
`;
