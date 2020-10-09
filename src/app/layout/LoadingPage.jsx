import React from 'react';
import styled from 'styled-components';
import { Spinner } from 'react-bootstrap';

const Loading = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingPage = () => {
  return (
    <Loading>
      <div className='loader-container'>
        <Spinner variant='primary' animation='border' />
      </div>
    </Loading>
  );
};

export default LoadingPage;
