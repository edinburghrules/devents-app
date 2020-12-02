import React from 'react';
import styled from 'styled-components';
import { Container, Button } from 'react-bootstrap';

const PageNotFoundContainer = styled(Container)`
  margin-top: 20vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const PageNotFoundText = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.2rem;
`;

const PageNotFoundButton = styled(Button)`
  margin-top: 2rem;
  background: #ff6e5c !important;
  border: none !important;
  font-size: 1.2rem;
  padding: .5rem 1.5rem;
`;

const PageNotFound = (props) => {
  const {history} = props;

  const handleClick = () => {
    history.push('/');
  }
  
  return (
    <PageNotFoundContainer>
      <iframe
        src='https://giphy.com/embed/RjoLWhQBFEcHS'
        width='480'
        height='270'
        frameBorder='0'
        className='giphy-embed'
        allowFullScreen
        title='Lost'
      ></iframe>
      <PageNotFoundText>
        <h4>Sorry, we couldn't find what you're looking for</h4>
        <PageNotFoundButton onClick={handleClick}>Go back</PageNotFoundButton>
      </PageNotFoundText>
    </PageNotFoundContainer>
  );
};

export default PageNotFound;
