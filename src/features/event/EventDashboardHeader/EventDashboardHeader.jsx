import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  EventDashboardHeaderContainer,
  EventDashboardHeaderText,
  EventDashboardHeaderBtn,
} from '../../../app/styled/event/EventDashboardHeader/EventDashboardHeader';

const EventDashboardHeader = (props) => {
  console.log(props);
  return (
    <EventDashboardHeaderContainer>
      <EventDashboardHeaderText>Find your people.</EventDashboardHeaderText>
      {!props.authenticated && (
        <EventDashboardHeaderBtn as={Link} to={'/signup'}>
          Join Us - It's Free
        </EventDashboardHeaderBtn>
      )}
    </EventDashboardHeaderContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: Boolean(state.auth.currentUser)
  };
};

export default connect(mapStateToProps)(EventDashboardHeader);
