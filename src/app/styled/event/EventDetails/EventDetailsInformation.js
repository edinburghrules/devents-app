import styled from 'styled-components';
import { Container } from 'react-bootstrap';

export const EventDetailsInformationContainer = styled(Container)`
  margin-top: 6rem;
`;

export const EventDetailsInformationCard = styled.div`
  text-align: left;
  background: #fff;
  box-shadow: 0px 2px 2px 2px #e0e0e0 !important;
  border-radius: 4px !important;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

export const EventDetailsInformationCardHeading = styled.h3`
  font-weight: 600;
  font-size: 1.3rem;
  margin-bottom: 1.4rem;
  display: flex;
  align-items: center;
`;

export const EventDetailsInformationTotalAttendees = styled.span`
  font-weight: 600;
  font-size: 0.8rem;
  margin-left: 0.4rem;
`;

export const EventDetailsInformationAttendeesSection = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const EventDetailsInformationMap = styled.div`
  margin-top: 2rem;
  padding: 0;
`;


export const EventDetailsInformationDate = styled.span`
  margin-left: .7rem;
  ${({ isCancelled }) => isCancelled && `
    text-decoration: line-through;
  `}
`;
