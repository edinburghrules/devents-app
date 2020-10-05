import React from 'react';
import { Link } from 'react-router-dom';
import {
  EventDashboardHeaderContainer,
  EventDashboardHeaderText,
  EventDashboardHeaderBtn,
} from '../../../app/styled/event/EventDashboardHeader/EventDashboardHeader';

const EventDashboardHeader = () => {
  return (
    <EventDashboardHeaderContainer>
      <EventDashboardHeaderText>Find your people.</EventDashboardHeaderText>
      <EventDashboardHeaderBtn as={Link} to={'/signup'}>
       Join Us - It's Free
      </EventDashboardHeaderBtn>
    </EventDashboardHeaderContainer>
  );
};

export default EventDashboardHeader;
