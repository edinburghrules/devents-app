import React from 'react';
import styled from 'styled-components';
import { Row, Container, Form, Button, Col } from 'react-bootstrap';
import EventDetailsChatMessage from './EventDetailsChatMessage';
import firebase from '../../../app/config/firebase';

const EventChatHeading = styled.h3`
  font-weight: 600;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
`;

const EventChatForm = styled(Form)`
  margin-top: 4rem;
  display: flex;
`;

const EventChatSendButton = styled(Button)`
  background: #ff6f61 !important;
  border: #ff6f61 !important;
  border-radius: 5px !important;
  margin-left: 1rem;
  width: 6rem;
  & img {
    width: 20px;
  }
`;

const NoPosts = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 500;
  margin-top: 4rem;
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
            initMessages.push({ id: change.doc.id, data: change.doc.data() });
          }
        });
        this.setState({
          messages: [...initMessages],
        });
      });
  };

  componentDidMount = () => {
    this.runListener();
  };

  componentWillUnmount = () => {
    let unsubscribe = this.runListener();
    unsubscribe();
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    e.preventDefault();
    if (this.state.newMessage.length > 0) {
      firebase
        .firestore()
        .collection('event_chats')
        .doc(this.props.eventId)
        .collection(this.props.eventId)
        .add({
          displayName: this.props.currentUser.displayName,
          message: this.state.newMessage,
          photoURL: this.props.currentUser.photoURL,
          date: new Date(),
          userId: this.props.currentUser.uid,
          replies: [],
        });

      this.setState((prevState) => ({
        prevState,
        newMessage: '',
      }));
    }
  };

  render() {
    const { messages, newMessage } = this.state;
    const { currentUser, eventId } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <EventChatHeading>Discussion</EventChatHeading>
            {messages.length === 0 && <NoPosts>No posts to show</NoPosts>}
            {messages &&
              messages.map((message, index) => {
                return (
                  <EventDetailsChatMessage
                    eventId={eventId}
                    key={index}
                    message={message}
                    currentUser={currentUser}
                  />
                );
              })}
            <EventChatForm onSubmit={this.handleSubmit}>
              <Form.Control
                id='newMessage'
                onChange={this.handleChange}
                placeholder='Type a message'
                value={newMessage}
              />
              <EventChatSendButton type='submit'>
                <img src='/assets/send.png' alt='submit'/>
              </EventChatSendButton>
            </EventChatForm>
          </Col>
          <Col />
        </Row>
      </Container>
    );
  }
}

export default EventDetailsChat;
