import React from 'react';
import styled from 'styled-components';
import { format, fromUnixTime } from 'date-fns';

const ChatMessage = styled.li`
  background: #ffffff;
  min-width: 50%;
  max-width: 50%;
  padding: 0.4rem;
  list-style: none;
  margin-bottom: 1.4rem;
  word-wrap: break-word;
  ${(props) =>
    props.isUser &&
    `
    align-self: flex-end;
  `}
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
  font-weight: 600;
  color: ${(props) => props.color};
`;

const Message = styled.p`
  margin: 0.2rem 0 0.5rem 0 !important;
  color: #333;
  font-weight: 600;
  font-size: 0.8rem;
`;

const ChatMessageDateContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-right: 0.8rem;
`;

const ChatMessageDate = styled.div`
  margin: 0 !important;
  font-size: 0.6rem;
  color: #aaaaaa;
  margin-right: 0.5rem;
`;

const EventDetailsChatMessage = (props) => {
  const {
    message: { photoURL, message, displayName, date },
    user,
  } = props;
  return (
    <ChatMessage isUser={props.message.userId === user.uid}>
      <ChatMessageUser>
        <ChatMessageUserPhoto src={photoURL && photoURL} />
        <ChatMessageUserName
          color={props.message.userId === user.uid ? '#51cf66' : '#4dabf7'}
        >
          {displayName && displayName}
        </ChatMessageUserName>
      </ChatMessageUser>
      <Message>{message}</Message>
      <ChatMessageDateContainer>
        <ChatMessageDate>
          <span>{date && format(fromUnixTime(date.seconds), ' h:mm a ')}</span>
          on
          <span>{date && format(fromUnixTime(date.seconds), ' dd/LL/yy')}</span>
        </ChatMessageDate>
      </ChatMessageDateContainer>
    </ChatMessage>
  );
};

export default EventDetailsChatMessage;
