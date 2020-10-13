const initState = {
  allEvents: [],
  localEvents: [],
};

const eventReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_EVENTS':
      return {
        ...state,
        allEvents: [...action.payload],
      };
    case 'GET_LOCAL_EVENTS':
      return {
        ...state,
        localEvents: [...action.payload],
      };
    case 'CREATE_EVENT':
      return {
        ...state,
        allEvents: [...action.payload],
      };
    default:
      return state;
  }
};

export default eventReducer;
