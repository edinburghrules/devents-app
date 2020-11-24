import React, { Component } from 'react';
import styled from 'styled-components';
import { format, fromUnixTime, formatDistance } from 'date-fns';

const MessageReply = styled.div`
  margin-left: 3rem;
  margin-bottom: 1rem;
  padding: 0.9rem;
  border: 1px solid #eee;
  border-radius: 8px;
`;

const MessageReplyUser = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
`;

const MessageReplyUserPhoto = styled.img`
  height: 1.5rem;
  margin-right: 0.5rem;
  border-radius: 100%;
`;

const MessageReplyUserName = styled.p`
  margin: 0 !important;
  font-size: 0.8rem;
  font-weight: 600;
`;

const ReplyText = styled.p`
  margin: 1rem 0 0.5rem 0.5rem !important;
  color: #333;
  font-weight: 500;
  font-size: 0.8rem;
`;

const MessageReplyDateContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-right: 0.8rem;
`;

const MessageReplyDate = styled.div`
  margin: 0 !important;
  font-size: 0.6rem;
  color: #aaaaaa;
  margin-right: 0.5rem;
`;

class EventDetailsChatReply extends Component {
  render() {
    const { photoURL, displayName, replyText, date } = this.props.reply;
    return (
      <MessageReply>
        <MessageReplyUser>
          <MessageReplyUserPhoto src={photoURL && photoURL} />
          <div>
            <MessageReplyUserName>
              {displayName && displayName}
            </MessageReplyUserName>
            <MessageReplyDate>
              <span>
                {formatDistance(fromUnixTime(date.seconds), Date.now())} ago
              </span>
            </MessageReplyDate>
          </div>
        </MessageReplyUser>
        <ReplyText>{replyText}</ReplyText>
        <MessageReplyDateContainer></MessageReplyDateContainer>
      </MessageReply>
    );
  }
}

export default EventDetailsChatReply;
