import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DetailedUserEdit = () => {
  return (
    <div className='detailed-user-edit'>
      <Button as={Link} to='/user/edit-profile'>
        Edit
      </Button>
    </div>
  );
};

export default DetailedUserEdit;
