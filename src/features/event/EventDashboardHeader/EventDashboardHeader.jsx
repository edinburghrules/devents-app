import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const EventDashboardHeaderContainer = styled.div`
  height: 60vh;
  margin-top: 1rem;
  margin-bottom: -12rem;
  background: url(./assets/headerimg.jpg);
  background-size: cover;
  background-position-y: 5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const EventDashboardHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 6rem;
  align-items: flex-start;
  margin-top: -12.5rem;
`;

const EventDashboardHeaderText = styled.h1`
  font-size: 3rem;
  color: #333;
  font-weight: 700;
`;

const EventDashboardHeaderSubText = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
`;

const EventDashboardHeaderBtn = styled(Button)`
  margin-top: 1rem;
  padding: .5rem .9rem;
  font-size: .9rem;
  font-weight: 400;
  background: #FF6F61 !important;
  color: #fff !important;
  border-radius: 8px;
`;


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
