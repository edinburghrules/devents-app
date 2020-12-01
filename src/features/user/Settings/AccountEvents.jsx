import React from 'react';
import styled from 'styled-components';
import AccountEventCard from './AccountEventCard';
import { Tabs, Tab } from 'react-bootstrap';
import EventPagination from '../../../app/utils/Pagination';

const EventsCard = styled.div`
  color: #222;
`;

const EventsHeading = styled.h3`
  font-weight: 600;
  font-size: 1.3rem;
  margin-bottom: 4rem;
  display: flex;
  align-items: center;
`;

const EventsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 3rem 0;
`;

const EventPaginationContainer = styled.div`
  display: flex;
  justify-content: center;
`;


class AccountEvents extends React.Component {
  state = {
    key: 'past',
    eventsPerPage: 3,
    currentPage: 1
  };

  paginate = (page) => {
    this.setState({
      currentPage: page
    })
  }

  handleKey = (k) => {
    this.setState({
      key: k,
    });
  };



  render() {
    const {eventsPerPage, currentPage}= this.state;
    const { pastEvents, futureEvents, hosting } = this.props.events;

    const indexLastPost = currentPage * eventsPerPage;
    const indexFirstPost = indexLastPost - eventsPerPage;
    const pastEventsSliced = pastEvents.slice(indexFirstPost, indexLastPost);
    const futureEventsSliced = futureEvents.slice(indexFirstPost, indexLastPost);
    const hostingSliced = hosting.slice(indexFirstPost, indexLastPost);



    return (
      <EventsCard>
        <EventsHeading>Your Events</EventsHeading>
        <Tabs activeKey={this.state.key} onSelect={this.handleKey}>
          <Tab eventKey='past' title='Past Events' style={{color: 'red !important'}}>
            <EventsContainer>
              {pastEvents && pastEventsSliced.map((event) => <AccountEventCard key={event.id} event={event}/>)}
            </EventsContainer>
            <EventPaginationContainer>
                <EventPagination paginate={this.paginate} totalEvents={pastEvents.length} eventsPerPage={eventsPerPage}/>
              </EventPaginationContainer>
          </Tab>
          <Tab eventKey='future' title='Future Events'>
          <React.Fragment>
              <EventsContainer>
                {pastEvents &&
                  futureEventsSliced.map((event) => <AccountEventCard key={event.id} event={event}/>)}
              </EventsContainer>
              <EventPaginationContainer>
                <EventPagination paginate={this.paginate} totalEvents={futureEvents.length} eventsPerPage={eventsPerPage}/>
              </EventPaginationContainer>
            </React.Fragment>
          </Tab>
          <Tab eventKey='hosting' title='Hosting Events'>
            <EventsContainer>
              {hosting && hostingSliced.map((event) => <AccountEventCard key={event.id} event={event}/>)}
            </EventsContainer>
            <EventPaginationContainer>
                <EventPagination paginate={this.paginate} totalEvents={hosting.length} eventsPerPage={eventsPerPage}/>
              </EventPaginationContainer>
          </Tab>
        </Tabs>
      </EventsCard>
    );
  }
}

export default AccountEvents;
