import React from 'react';
import styled from 'styled-components';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import EventDetailsChatMessage from './EventDetailsChatMessage';
import firebase from '../../../app/config/firebase';

const ChatContainer = styled.div`
  width: 100%;
  height: 25rem;
  background: #efefef;
  padding: 1rem 2rem;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const EventChatHeading = styled.h3`
  font-weight: 600;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
`;

const EventChatForm = styled(Form)`
  margin-top: 0.5rem;
  display: flex;
`;

const EventChatSendButton = styled(Button)`
  background: #ff6f61 !important;
  border: #ff6f61 !important;
  border-radius: 5px !important;
  width: 6rem;
  margin-left: 1rem;
`;

class EventDetailsChat extends React.Component {
  state = {
    messages: [],
    newMessage: '',
  };

  runListener = () => {
    let initMessages = [];
    return firebase
      .firestore()
      .collection('event_chats')
      .doc(this.props.eventId)
      .collection(this.props.eventId)
      .orderBy('date')
      .onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            initMessages.push(change.doc.data());
          }
        });
        this.setState({
          messages: [...initMessages],
        });
      });
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.runListener();
  };

  componentWillUnmount = () => {
    this._isMounted = false;
    let unsubscribe = this.runListener();
    unsubscribe();
  };

  handleScroll = (e) => {
    const scrollContainer = document.querySelector('#chat');
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.newMessage.length > 0) {
      firebase
        .firestore()
        .collection('event_chats')
        .doc(this.props.eventId)
        .collection(this.props.eventId)
        .add({
          displayName: this.props.user.displayName,
          message: this.state.newMessage,
          photoURL: this.props.user.photoURL,
          date: new Date(),
          userId: this.props.user.uid
        });

      this.setState((prevState) => ({
        prevState,
        newMessage: '',
      }));
    }
  };

  render() {
    const { messages, newMessage } = this.state;
    const { user } = this.props;
    return (
      <Container>
        <Row>
          <Col>
            <EventChatHeading>Event Chat</EventChatHeading>
            <ChatContainer id='chat' onLoad={this.handleScroll}>
              {messages &&
                messages.map((message, index) => {
                  return (
                    <EventDetailsChatMessage key={index} message={message} user={user} />
                  );
                })}
                <div style={{height: '2rem'}}/>
            </ChatContainer>
            <EventChatForm onSubmit={this.handleSubmit}>
              <Form.Control
                id='newMessage'
                onChange={this.handleChange}
                placeholder='Type a message'
                value={newMessage}
              />
              <EventChatSendButton type='submit'>Send</EventChatSendButton>
            </EventChatForm>
          </Col>
          <Col />
        </Row>
      </Container>
    );
  }
}

export default EventDetailsChat;
