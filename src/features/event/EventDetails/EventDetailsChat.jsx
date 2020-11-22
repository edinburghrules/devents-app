import React from 'react';
import styled from 'styled-components';
import { Row, Col, Container, Form, InputGroup, Button } from 'react-bootstrap';
import EventDetailsChatMessage from './EventDetailsChatMessage';
import firebase from '../../../app/config/firebase';

const ChatContainer = styled.div`
  width: 100%;
  height: 25rem;
  background: #eee;
  padding: 1rem;
  overflow: scroll;
`;

const EventChatHeading = styled.h3`
  font-weight: 600;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
`;

const EventChatForm = styled(Form)`
  display: flex`
;

const EventChatSendButton = styled(Button)`
  background: #ff6f61 !important;
  border: #ff6f61 !important;
  border-radius: 5px !important;
  width: 6rem;
`;

class EventDetailsChat extends React.Component {
  state = {
    messages: [],
    newMessage: null
  };
  componentDidMount = () => {
    firebase
      .firestore()
      .collection('event_chats')
      .doc(this.props.eventId)
      .collection(this.props.eventId)
      .doc('molAZFhDS98p6RRhnE6z')
      .onSnapshot((querySnapshot) => {
        this.setState((prevState) => {
          return {
            ...prevState,
            messages: [querySnapshot.data()],
          };
        });
      });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
  }

  render() {
    const { messages } = this.state;
    return (
      <Container>
        <Row>
          <Col>
            <EventChatHeading>Event Chat</EventChatHeading>
            <ChatContainer>
              {messages &&
                messages.map((message, index) => {
                  return (
                    <EventDetailsChatMessage index={index} message={message} />
                  );
                })}
            </ChatContainer>
            <EventChatForm onSubmit={this.handleSubmit}>
              <Form.Control id='newMessage' onChange={this.handleChange} placeholder='Type a message' />
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
