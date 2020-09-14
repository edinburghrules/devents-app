import React from 'react';
import { Link } from 'react-router-dom';
import {
  UserProfileEditContainer,
  UserProfileEditButton,
} from '../../../app/styled/user/UserProfile/UserProfileEditBtn';

const DetailedUserEdit = ({userId}) => {
  return (
    <UserProfileEditContainer>
      <UserProfileEditButton as={Link} to={`/user/edit-profile/${userId}`}>
        Edit
      </UserProfileEditButton>
    </UserProfileEditContainer>
  );
};

export default DetailedUserEdit;
