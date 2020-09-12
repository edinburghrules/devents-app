import styled from 'styled-components';
import { Button } from 'react-bootstrap';
// import {Link} from 'react-router-dom';

export const EventDetailsHeadingSection = styled.div`
  background: #fff;
  border-bottom: 1px solid #eee;
  padding: 8rem 0rem 4rem 0rem;
  width: 100%;
  margin: 0 auto;
`;

export const EventDetailsHeadingTitle = styled.h1`
  font-weight: 600;
  padding-bottom: 1rem;
  color: #222;
`;

export const EventDetailsCancelled = styled(EventDetailsHeadingTitle)`
  font-size: 1.4rem;
`;

export const EventDetailsHostSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

export const EventDetailsHostImage = styled.img`
  height: 50px;
  margin-right: 1rem;
  border-radius: 50%;
`;

export const EventDetailsHostedBy = styled.h6`
  font-weight: 500;
  color: #1769ff;
`;

export const EventDetailsHostName = styled.h5`
  font-weight: 600;
  color: #333;
`;

export const EventDetailsAttendButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12rem;
  height: 3rem;
`;

export const EventDetailsUnattendButton = styled(Button)`
  width: 12rem;
  height: 3rem;
`;

export const EventDetailsEditButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12rem;
  height: 3rem;
  background: #17a2b8;
  color: #fff;
  border-radius: 4px;

  &:hover {
    text-decoration: none;
    color: #fff;
    background: rgba(23,162,184, 0.8);
  }
`;
