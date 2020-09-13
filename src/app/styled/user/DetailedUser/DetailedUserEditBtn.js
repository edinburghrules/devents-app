import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const DetailedUserEditContainer = styled.div`
  margin-left: auto;
`;

export const DetailedUserEditButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 3rem;
  background: #17a2b8;
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
