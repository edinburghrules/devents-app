import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fromUnixTime, format } from 'date-fns';

const EventCard = styled(Link)`
  text-decoration: none !important;
  color: #333 !important;
  background: #fff;
  box-shadow: 0 4px 2px -2px #eee;
  border: 1px solid #eee;
  width: 33.3%;
  border-radius: 4px;
  padding: 0.75rem 1rem 0.75rem 1rem;
`;

const EventTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
`;

const EventDate = styled.p`
  font-size: .7rem;
  font-weight: 500;
  color: #666;
`;

const EventCity = styled.p`
  font-size: .7rem;
  font-weight: 500;
  color: #666;
`;

const AccountEventCard = (props) => {
  const {title, date, city, id } = props.event;
  const formattedDate = format(fromUnixTime(date.seconds), 'MM/dd/yyyy');
  return (
    <EventCard to={`/event/${id}`}>
      <EventTitle>{title}</EventTitle>
      <EventDate>{formattedDate}</EventDate>
      <EventCity>{city}</EventCity>
    </EventCard>
  )
}

export default AccountEventCard;