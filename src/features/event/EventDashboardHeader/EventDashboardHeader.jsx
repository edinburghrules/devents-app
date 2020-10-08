import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  EventDashboardHeaderContainer,
  EventDashboardHeaderContent,
  EventDashboardHeaderText,
  EventDashboardHeaderSubText,
  EventDashboardHeaderBtn,
} from '../../../app/styled/event/EventDashboardHeader/EventDashboardHeader';

const EventDashboardHeader = (props) => {
  return (
    <EventDashboardHeaderContainer>
      <EventDashboardHeaderContent>
        <EventDashboardHeaderText>Find your interests</EventDashboardHeaderText>
        <EventDashboardHeaderSubText>and the people that share them too.</EventDashboardHeaderSubText>
        {!props.authenticated && (
          <EventDashboardHeaderBtn as={Link} to={'/signup'}>
            Join us - it's free
          </EventDashboardHeaderBtn>
        )}
      </EventDashboardHeaderContent>
    </EventDashboardHeaderContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: Boolean(state.auth.currentUser)
  };
};

export default connect(mapStateToProps)(EventDashboardHeader);
