import styled from 'styled-components';
import { Image } from 'react-bootstrap';


export const EventListAttendeeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: .8rem;
`;

export const EventListAttendeeAvatarImage = styled(Image)`
  height: 1.5rem;
`;

export const EventListAttendeeName = styled.p`
 font-size: .5rem;
 margin-top: .6rem;
`;
