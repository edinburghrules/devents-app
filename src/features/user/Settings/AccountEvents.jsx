import React from 'react';
import styled from 'styled-components';
import AccountEventCard from './AccountEventCard';
import { Tabs, Tab } from 'react-bootstrap';

const EventsCard = styled.div`
  box-shadow: 0px 2px 2px 2px #e0e0e0;
  border-radius: 8px;
  background: #ffffff;
  color: #222;
  padding: 2.5rem 3rem;
  margin-bottom: 2rem;
`;

const EventsHeading = styled.h3`
  font-weight: 600;
  font-size: 1.3rem;
  margin-bottom: 1.4rem;
  display: flex;
  align-items: center;
`;

const EventsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 3rem 0;
`;

class AccountEvents extends React.Component {
  state = {
    key: 'past',
  };

  handleKey = (k) => {
    this.setState({
      key: k,
    });
  };

  render() {
    const { pastEvents, futureEvents, hosting } = this.props.events;
    console.log(pastEvents);
    return (
      <EventsCard>
        <EventsHeading>Your Events</EventsHeading>
        <Tabs activeKey={this.state.key} onSelect={this.handleKey}>
          <Tab eventKey='past' title='Past Events'>
            <EventsContainer>
              {pastEvents && pastEvents.map((event) => <AccountEventCard key={event.id} event={event}/>)}
            </EventsContainer>
          </Tab>
          <Tab eventKey='future' title='Future Events'>
            <EventsContainer>
              {pastEvents &&
                futureEvents.map((event) => <AccountEventCard key={event.id} event={event}/>)}
            </EventsContainer>
          </Tab>
          <Tab eventKey='hosting' title='Hosting Events'>
            <EventsContainer>
              {hosting && hosting.map((event) => <AccountEventCard key={event.id} event={event}/>)}
            </EventsContainer>
          </Tab>
        </Tabs>
      </EventsCard>
    );
  }
}

export default AccountEvents;
