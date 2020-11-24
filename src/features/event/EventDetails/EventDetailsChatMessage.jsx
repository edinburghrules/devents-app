import React from 'react';
import styled from 'styled-components';
import firebase from '../../../app/config/firebase';
import { Form } from 'react-bootstrap';
import { format, fromUnixTime, formatDistance } from 'date-fns';
import EventDetailsChatReply from './EventDetailsChatReply';

const ChatMessage = styled.li`
  padding: 0.4rem;
  list-style: none;
  margin-bottom: 1rem;
  word-wrap: break-word;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fafafa;
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
  margin: 1rem 0 0.5rem 0.5rem !important;
  color: #333;
  font-weight: 500;
  font-size: 0.9rem;
`;

const ChatMessageDateContainer = styled.div`
  margin: 0.4rem 0 0.5rem 0.5rem !important;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const ChatMessageDate = styled.div`
  margin: 0 !important;
  font-size: 0.6rem;
  color: #aaaaaa;
  margin-right: 0.5rem;
`;

const ReplyButton = styled.button`
  all: unset;
  font-size: 0.8rem;
  color: #777;
  outline: none;
`;

const ReplyFormInput = styled(Form.Control)`
  font-size: 0.9rem;
  color: #333;
  margin-left: 0.4rem;
  width: 90%;
`;

class EventDetailsChatMessage extends React.Component {
  state = {
    isOpen: false,
    [`reply_${this.props.messageId}`]: '',
    messageReplies: [],
  };

  handleClick = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .firestore()
      .collection('event_chats')
      .doc(this.props.eventId)
      .collection(this.props.eventId)
      .doc(`${this.props.messageId}`)
      .update({
        replies: firebase.firestore.FieldValue.arrayUnion({
          replyText: this.state[`reply_${this.props.messageId}`],
          displayName: this.props.user.displayName,
          photoURL: this.props.user.photoURL,
          date: new Date(),
          userId: this.props.user.uid,
        }),
      });
    this.setState({
      isOpen: false,
    });
  };

  runListener = () => {
    return firebase
      .firestore()
      .collection('event_chats')
      .doc(this.props.eventId)
      .collection(this.props.eventId)
      .doc(`${this.props.messageId}`)
      .onSnapshot((querySnapshot) => {
        this.setState({
          messageReplies: querySnapshot.data(),
        });
      });
  };

  componentDidMount = () => {
    this.runListener();
  };

  render(props) {
    const {
      message: { photoURL, message, displayName, date, userId },
      messageId,
      user,
    } = this.props;

    const { replies } = this.state.messageReplies;

    return (
      <React.Fragment>
        <ChatMessage isUser={userId === user.uid}>
          <ChatMessageUser>
            <ChatMessageUserPhoto src={photoURL && photoURL} />
            <div>
            <ChatMessageUserName
              color={userId === user.uid ? '#51cf66' : '#4dabf7'}
            >
              {displayName && displayName}
            </ChatMessageUserName>
            <ChatMessageDate>
            <span>
              {formatDistance(fromUnixTime(date.seconds), Date.now())} ago
            </span>
          </ChatMessageDate>
          </div>
          </ChatMessageUser>
          <Message>{message}</Message>
          <ChatMessageDateContainer>
            <ReplyButton onClick={this.handleClick}>reply</ReplyButton>
          </ChatMessageDateContainer>
          {this.state.isOpen && (
            <Form onSubmit={this.handleSubmit}>
              <ReplyFormInput
                id={`reply_${messageId}`}
                onChange={this.handleChange}
                value={this.state[`reply_${this.props.messageId}`]}
                type='text'
              />
            </Form>
          )}
        </ChatMessage>
        {replies &&
          replies.map((reply) => <EventDetailsChatReply reply={reply} />)}
      </React.Fragment>
    );
  }
}

export default EventDetailsChatMessage;
