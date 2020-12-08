import React from 'react';
import styled from 'styled-components';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const EventDashboardHeaderContainer = styled.div`
  height: 60vh;
  margin-top: 6rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media (max-width: 1200px) {
    margin-top: 4rem;
  }

  @media (max-width: 992px) {
    margin-top: 1rem;
    margin-bottom: -8rem;
  }

  @media(max-width: 595px) {
    margin-top: 12rem;
    margin-bottom: 2rem;
  }
`;

const BootstrapContainer = styled(Container)`
  @media (max-width: 767px) {
    max-width: 100% !important;
    padding: 0 2rem;
  }

  @media (max-width: 595px) {
    padding: 0;
  }
`;

const EventDashboardHeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -4rem;

  @media (max-width: 1200px) {
    justify-content: center;
  }

  @media (max-width: 595px) {
    flex-direction: column;
  }
`;

const EventDashboardTextContainer = styled.div`
    @media (max-width: 595px) {
      display: flex;
      flex-direction: column;
      align-items: center;
  }
`;

const EventDashboardHeaderText = styled.h1`
  font-size: 3rem;
  color: #000;
  font-weight: 700;
  margin-top: -10rem;

  @media (max-width: 1200px) {
    margin-top: -6rem;
  }

  @media (max-width: 992px) {
    font-size: 2.5rem;
  }

  @media (max-width: 595px) {
    text-align: center;
    font-size: 2.8rem;
  }

  @media (max-width: 500px) {
    font-size: 2.4rem;
  }

`;

const EventDashboardHeaderSubText = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: #444;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const EventDashboardHeaderBtn = styled(Button)`
  padding: 0.5rem 0.9rem;
  font-size: 1.1rem;
  font-weight: 400;
  background: #ff6f61 !important;
  color: #fff !important;
  border-radius: 4px;
  display: inline-block;
  margin-top: 1rem;

  @media (max-width: 595px) {
    font-size: 1rem;
  }
`;

const HeaderImg = styled.img`
  height: 32rem;

  @media (max-width: 992px) {
    height: 18rem;
  }

  @media (max-width: 767px) {
    max-width: 100%;
    height: 14rem;
  }

  @media (max-width: 595px) {
    max-width: 100%;
    height: 22rem;
    margin-top: 1.1rem;
  }
`;

const EventDashboardHeader = (props) => {
  return (
    <EventDashboardHeaderContainer>
      <BootstrapContainer>
        <EventDashboardHeaderContent>
          <EventDashboardTextContainer>
            <EventDashboardHeaderText>
              Find your interests <br /> and the people <br /> that share them.
            </EventDashboardHeaderText>
            <EventDashboardHeaderSubText>
              Devents helps developers network and grow.
            </EventDashboardHeaderSubText>
            {!props.authenticated && (
              <EventDashboardHeaderBtn as={Link} to={'/signup'}>
                Join us - it's free
              </EventDashboardHeaderBtn>
            )}
          </EventDashboardTextContainer>
          <HeaderImg src='./assets/headerimg.jpg' />
        </EventDashboardHeaderContent>
      </BootstrapContainer>
    </EventDashboardHeaderContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: Boolean(state.auth.currentUser),
  };
};

export default connect(mapStateToProps)(EventDashboardHeader);
