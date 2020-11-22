import React from 'react';
import styled from 'styled-components';
import { format, fromUnixTime } from 'date-fns';

const ChatMessage = styled.div`
  background: #ffffff;
  width: 50%;
  border-radius: 8px;
  padding: 0.4rem;
  border: 1px solid #ddd;
`;

const ChatMessageUser = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
`;

const ChatMessageUserPhoto = styled.img`
  height: 1.5rem;
  margin-right: 0.5rem;
  border-radius: 100%;
`;

const ChatMessageUserName = styled.p`
  margin: 0 !important;
  font-size: 0.8rem;
  color: #51cf66;
  font-weight: 600;
`;

const Message = styled.p`
  margin: .2rem 0 .5rem 0 !important;
  color: #333;
  font-weight: 600;
  font-size: .8rem;
`;

const ChatMessageDateContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-right: .8rem;
`;

const ChatMessageDate = styled.div`
  margin: 0 !important;
  font-size: 0.6rem;
  color: #aaaaaa;
  margin-right: .5rem;
`;



const EventDetailsChatMessage = (props) => {
  const { photoURL, message, displayName, date } = props.message;
  return (
    <ChatMessage>
      <ChatMessageUser>
        <ChatMessageUserPhoto src={photoURL && photoURL} />
        <ChatMessageUserName>{displayName && displayName}</ChatMessageUserName>
      </ChatMessageUser>
      <Message>{message}</Message>
      <ChatMessageDateContainer>
        <ChatMessageDate>
          <span>{format(fromUnixTime(date.seconds), ' h:mm a ')}</span>
          on  
          <span>{format(fromUnixTime(date.seconds), ' dd/LL/yy')}</span>
        </ChatMessageDate>
      </ChatMessageDateContainer>
    </ChatMessage>
  );
};

export default EventDetailsChatMessage;
