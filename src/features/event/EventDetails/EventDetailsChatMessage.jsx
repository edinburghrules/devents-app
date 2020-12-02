import React from 'react';
import styled from 'styled-components';
import firebase from '../../../app/config/firebase';
import { Form, Button } from 'react-bootstrap';
import { fromUnixTime, formatDistance } from 'date-fns';
import EventDetailsChatReply from './EventDetailsChatReply';

const ChatMessage = styled.div`
  padding: 0.4rem 1rem;
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
  margin: 1rem 0 0.5rem 0 !important;
  color: #333;
  font-weight: 500;
  font-size: 0.9rem;
`;

const ChatMessageDate = styled.div`
  margin: 0 !important;
  font-size: 0.6rem;
  color: #aaaaaa;
  margin-right: 0.5rem;
`;

const ChatMessageButtons = styled.div`
  margin: 0.4rem 0.5rem 0.5rem 0 !important;
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

const ReplyButton = styled.button`
  all: unset;
  font-size: 0.8rem;
  color: #777;
  outline: none;

  & img {
    margin-left: 0.2rem;
    width: 8px;
  }
`;

const ShowReplies = styled(ReplyButton)`
  margin-left: 1rem;

  & img {
    width: 10px;
    margin-left: 0.2rem;
  }
`;

const ReplyForm = styled(Form)`
  display: flex;
  width: 90%;
`;

const ReplyFormInput = styled(Form.Control)`
  font-size: 0.9rem;
  color: #333;
  margin-left: 0.4rem;
  margin-right: 0.4rem;
`;

const ReplySendButton = styled(Button)`
  background: #ff6f61 !important;
  border: none;
  & img {
    width: 20px;
  }
`;

class EventDetailsChatMessage extends React.Component {
  state = {
    showForm: false,
    [`reply_${this.props.message.id}`]: '',
    messageReplies: [],
    showReplies: false,
  };

  showReplies = () => {
    this.setState((prevState) => ({
      prevState,
      showReplies: !prevState.showReplies,
    }));
  };

  showForm = () => {
    this.setState((prevState) => ({
      showForm: !prevState.showForm,
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
      .doc(this.props.message.id)
      .update({
        replies: firebase.firestore.FieldValue.arrayUnion({
          replyText: this.state[`reply_${this.props.message.id}`],
          displayName: this.props.currentUser.displayName,
          photoURL: this.props.currentUser.photoURL,
          date: new Date(),
          userId: this.props.currentUser.uid,
        }),
      });
    this.setState({
      showForm: false,
      showReplies: true,
      [`reply_${this.props.message.id}`]: '',
    });
  };

  runListener = () => {
   this.unsubscribe = firebase
      .firestore()
      .collection('event_chats')
      .doc(this.props.message.id)
      .onSnapshot((querySnapshot) => {
        this.setState({
          messageReplies: querySnapshot.data(),
        });
      });
  };

  componentDidMount = () => {
    this.runListener();
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  render(props) {
    const {
      message: {
        messageData: { photoURL, message, displayName, date, userId },
        id,
      },
      currentUser,
    } = this.props;

    const {
      showReplies,
      messageReplies: { replies },
    } = this.state;

    return (
      <React.Fragment>
        <ChatMessage>
          <ChatMessageUser>
            <ChatMessageUserPhoto src={photoURL && photoURL} />
            <div>
              <ChatMessageUserName
                color={userId === currentUser.uid ? '#51cf66' : '#4dabf7'}
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
          <ChatMessageButtons>
            <ReplyButton onClick={this.showForm}>
              <span>reply</span>
              <img src='/assets/chat.png' alt='reply' />
            </ReplyButton>
            {replies && replies.length > 0 && (
              <ShowReplies onClick={this.showReplies}>
                <span>
                  {showReplies
                    ? `hide replies (${replies.length})`
                    : `show replies (${replies.length})`}
                </span>
                <img
                  src={
                    showReplies
                      ? '/assets/up-arrow.png'
                      : '/assets/down-arrow.png'
                  }
                  alt='showreplies'
                />
              </ShowReplies>
            )}
          </ChatMessageButtons>
          {this.state.showForm && (
            <ReplyForm onSubmit={this.handleSubmit}>
              <ReplyFormInput
                id={`reply_${id}`}
                onChange={this.handleChange}
                value={this.state[`reply_${id}`]}
                type='text'
              />
              <ReplySendButton type='submit'>
                <img src='/assets/send.png' alt='send' />
              </ReplySendButton>
            </ReplyForm>
          )}
        </ChatMessage>
        {showReplies &&
          replies &&
          replies.map((reply, index) => (
            <EventDetailsChatReply key={`${id}_${index}`} reply={reply} />
          ))}
      </React.Fragment>
    );
  }
}

export default EventDetailsChatMessage;
