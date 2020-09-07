import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Loading } from '../styled/global/loading/loading';

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
