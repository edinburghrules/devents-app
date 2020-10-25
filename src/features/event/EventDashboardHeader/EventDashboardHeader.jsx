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
  background-size: 40%;
  background-position-y: 1rem;
  background-position-x: 45rem;
  background-repeat: no-repeat;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const EventDashboardHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 18rem;
  align-items: flex-start;
  margin-top: -4rem;
`;

const EventDashboardHeaderText = styled.h1`
  font-size: 2.5rem;
  color: #000;
  font-weight: 700;
`;

const EventDashboardHeaderSubText = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: #444;
  margin-top: 1rem;
`;

const EventDashboardHeaderBtn = styled(Button)`
  margin-top: 1rem;
  padding: .5rem .9rem;
  font-size: .9rem;
  font-weight: 400;
  background: #FF6F61 !important;
  color: #fff !important;
  border-radius: 4px;
`;


const EventDashboardHeader = (props) => {
  return (
    <EventDashboardHeaderContainer>
      <EventDashboardHeaderContent>
        <EventDashboardHeaderText>Find your interests <br/> and the people <br/> that share them.</EventDashboardHeaderText>
        <EventDashboardHeaderSubText>Devents helps developers network and grow.</EventDashboardHeaderSubText>
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
