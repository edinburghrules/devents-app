import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fromUnixTime, format } from 'date-fns';

const EventCard = styled(Link)`
  text-decoration: none !important;
  color: #333 !important;
  background: #fff;
  border: 1px solid #eee;
  width: 30%;
  border-radius: 8px;
  padding: 1rem 1.2rem 1rem 1.2rem;
  margin-right: 3%;
`;

const EventPhoto = styled.img`
  width: 100%;
  text-align: center;
  border-radius: 8px;
`;

const EventTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 500;
  margin-top: 1.2rem;
  color: #222;
`;

const EventDate = styled.p`
  font-size: .8rem;
  font-weight: 400;
  color: #777;
`;

const EventCity = styled.p`
  font-size: .8rem;
  font-weight: 400;
  color: #777;
  margin-top: -1rem;
`;

const AccountEventCard = (props) => {
  const {title, date, city, id, photo } = props.event;
  const formattedDate = format(fromUnixTime(date.seconds), 'do MMMM yyyy');
  return (
    <EventCard to={`/event/${id}`}>
      <EventPhoto src={photo} alt='event' />
      <EventTitle>{title}</EventTitle>
      <EventDate>{formattedDate}</EventDate>
      <EventCity>{city}</EventCity>
    </EventCard>
  )
}

export default AccountEventCard;