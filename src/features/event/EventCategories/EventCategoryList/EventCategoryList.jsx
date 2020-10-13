import React from 'react';
import EventListItem from '../../EventList/EventListItem';
import SearchTextInput from '../../../../app/form-inputs/SearchTextInput';

class EventCategoryList extends React.Component {
  state={
    searchTerm: ''
  }
  handleClick = (a) =>{
    this.setState({
      searchTerm: a
    })
  }
  render() {
    const {events} = this.props;
    return (
      <React.Fragment>
      <SearchTextInput getSearchTerm={this.handleClick}/>
        {events && events.map(event => {
          if(event.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
            return (<EventListItem key={event.id} event={event}/>)
          }
          return null;
        })}
      </React.Fragment>
    )
  }
}

export default EventCategoryList;