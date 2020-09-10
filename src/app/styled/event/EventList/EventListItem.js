import styled from 'styled-components';
import { Card } from 'react-bootstrap';

export const EventListItemCardLink = styled.a`
  text-decoration: none !important;
`;

export const EventListItemCard = styled(Card)`
  box-shadow: 0px 2px 2px 2px #e0e0e0 !important;
  border-radius: 10px !important;
  color: #222;
  margin-bottom: 3rem;
`;

export const EventListItemCardTitle = styled(Card.Title)`
  font-size: 1.6rem !important;
  font-weight: 600 !important;
  margin-top: 1.5rem !important;
`;

export const EventListItemCardBookButton = styled(Card.Body)`
  margin-top: 0.5rem;
  display: flex;
  justify-content: flex-start;
`;

export const EventListItemCardEventInfo = styled.div`
  margin-top: -2.5rem;
  font-size: 0.8rem;
  letter-spacing: 0.3px;
  font-weight: 400;
  color: #555;
  display: flex;
  flex-direction: column;
`;

export const EventListCardPeopleGoingHeading = styled(Card.Body)`
  font-size: .8rem;
  font-weight: 600;
  padding: 0;
  margin-top: -1rem;
`;

export const EventListItemCardPeopleGoing = styled(Card.Body)`
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: flex-start;
`;

export const EventListItemCardCancelledTextContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const EventListItemCardCancelledIcon = styled.span.attrs({
  role: 'img',
  ariaLabel: 'event cancelled icon',
})`
  font-size: 0.65rem;
  margin-right: 0.3rem;
`;

export const EventListItemCardDate = styled.span`
  ${({ isCancelled }) =>
    isCancelled &&
    `
    text-decoration: line-through;
  `}
`;
