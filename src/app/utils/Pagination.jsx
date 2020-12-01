import React from 'react';
import {Pagination} from 'react-bootstrap';

const EventPagination = (props) => {

  const {totalEvents, eventsPerPage, paginate} = props;

  let pages = [];

  for(let i = 1; i <= Math.ceil(totalEvents / eventsPerPage); i++) {
    pages.push(i)
  }

  if(pages.length > 1) {
    return (
      <Pagination>
        {pages.map(page => (
          <Pagination.Item onClick={() => paginate(page)}>{page}</Pagination.Item>
        ))}
      </Pagination> 
    )
  } 

  return null;

}

export default EventPagination;