import React from 'react';
import InfiniteScrollComponent from '../../../../app/utils/InfiniteScroll';

class EventCategoryList extends React.Component {
  render() {
    let { events } = this.props;
    return (
      <React.Fragment>
        <InfiniteScrollComponent events={events} />
      </React.Fragment>
    );
  }
}

export default EventCategoryList;
