const createEvent = (event) => {
  return {
    type: 'CREATE_EVENT',
    payload: event,
  };
};

const editEvent = (event) => {
  return {
    type: 'EDIT_EVENT',
    payload: event
  }
}

export { createEvent, editEvent };
