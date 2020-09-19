import React from 'react';
import { Link } from 'react-router-dom';
import {
  UserProfileFollowContainer,
  UserProfileFollowButton,
} from '../../../app/styled/user/UserProfile/UserProfileFollowBtn';

const UserProfileEdit = () => {
  return (
    <UserProfileFollowContainer>
      <UserProfileFollowButton>
        Follow
      </UserProfileFollowButton>
    </UserProfileFollowContainer>
  );
};

export default UserProfileEdit;