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
`;

export const EventListItemCardBookButton = styled(Card.Body)`
  margin-top: 0.5rem;
  display: flex;
  justify-content: flex-end;
`;

export const EventListItemCardEventInfo = styled.div`
  margin-top: -2rem;
  font-size: 0.75rem;
  letter-spacing: 0.3px;
  font-weight: 400;
  color: #606060;
  display: flex;
  flex-direction: column;
`;

export const EventListItemCardPeopleGoing = styled(Card.Body)`
  font-size: 0.8rem;
  font-weight:600;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const EventListItemCardCancelledTextContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const EventListItemCardCancelledIcon = styled.span.attrs({
  role: 'img',
  ariaLabel: 'event cancelled icon'
})`
  font-size: .65rem;
  margin-right: .3rem;
`;

export const EventListItemCardDate = styled.span`
  ${({ isCancelled }) => isCancelled && `
    text-decoration: line-through;
  `}
`;