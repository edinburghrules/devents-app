import React from 'react';
import {Pagination} from 'react-bootstrap';

const EventPagination = (props) => {

  const {totalEvents, eventsPerPage, paginate} = props;

  let pages = [];

  for(let i = 1; i <= Math.ceil(totalEvents / eventsPerPage); i++) {
    pages.push(i)
  }
  return (
    <Pagination>
      {pages.map(page => (
        <Pagination.Item onClick={() => paginate(page)}>{page}</Pagination.Item>
      ))}
    </Pagination> 
  )
}

export default EventPagination;