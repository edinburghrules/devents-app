import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingPage = () => {
  return (
    <div className='loading-page'>
      <div className='loader-container'>
        <Spinner variant='primary' animation='border' />
      </div>
    </div>
  );
};

export default LoadingPage;
