import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const UserProfileEditContainer = styled.div`
  margin-left: auto;

  @media(max-width: 767px) {
    margin-left: 0;
    margin-top: 1rem;
  }
`;

const UserProfileEditButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 3rem;
  background: #ff6f61 !important;
  color: #fff;
  border-radius: 4px;

  &:hover {
    text-decoration: none;
    color: #fff;
    background: rgba(23, 162, 184, 0.8);
  }

  &:active {
    background: #128293;
  }
`;


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
