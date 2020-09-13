import React from 'react';
import { Link } from 'react-router-dom';
import {
  DetailedUserEditContainer,
  DetailedUserEditButton,
} from '../../../app/styled/user/DetailedUser/DetailedUserEditBtn';

const DetailedUserEdit = () => {
  return (
    <DetailedUserEditContainer>
      <DetailedUserEditButton as={Link} to='/user/edit-profile'>
        Edit
      </DetailedUserEditButton>
    </DetailedUserEditContainer>
  );
};

export default DetailedUserEdit;
