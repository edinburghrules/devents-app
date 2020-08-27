import React from 'react';
import { Spinner } from 'react-bootstrap';

const Dimmer = () => {
  return (
    <div className='dimmer'>
      <div className='spinner-container'>
        <Spinner variant='primary' animation='border' />
      </div>
    </div>
  );
};

export default Dimmer;
