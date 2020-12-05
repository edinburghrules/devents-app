import React from 'react';
import styled from 'styled-components';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const EventDashboardHeaderContainer = styled.div`
  height: 60vh;
  margin-top: 10rem;
  margin-bottom: -12rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const EventDashboardHeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -4rem;
`;

const EventDashboardHeaderText = styled.h1`
  font-size: 3rem;
  color: #000;
  font-weight: 700;
  margin-top: -10rem;
`;

const EventDashboardHeaderSubText = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: #444;
  margin-top: 1rem;
`;

const EventDashboardHeaderBtn = styled(Button)`
  margin-top: 1rem;
  padding: 0.5rem 0.9rem;
  font-size: 0.9rem;
  font-weight: 400;
  background: #ff6f61 !important;
  color: #fff !important;
  border-radius: 4px;
`;

const HeaderImg = styled.img`
  height: 35rem;
`;

const EventDashboardHeader = (props) => {
  return (
    <EventDashboardHeaderContainer>
    <Container>
      <EventDashboardHeaderContent>
        <div>
          <EventDashboardHeaderText>
            Find your interests <br /> and the people <br /> that share them.
          </EventDashboardHeaderText>
          <EventDashboardHeaderSubText>
            Devents helps developers network and grow.
          </EventDashboardHeaderSubText>
        </div>
        {!props.authenticated && (
          <EventDashboardHeaderBtn as={Link} to={'/signup'}>
            Join us - it's free
          </EventDashboardHeaderBtn>
        )}
        <HeaderImg src='./assets/headerimg.jpg' />
      </EventDashboardHeaderContent>
      </Container>
    </EventDashboardHeaderContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: Boolean(state.auth.currentUser),
  };
};

export default connect(mapStateToProps)(EventDashboardHeader);
