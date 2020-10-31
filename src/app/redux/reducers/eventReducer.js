const initState = {
  events: [],
};

const eventReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_EVENTS':
      return {
        ...state,
        events: [...action.payload],
      };
    case 'CREATE_EVENT':
      return {
        ...state,
        events: [...action.payload],
      };
    default:
      return state;
  }
};

export default eventReducer;
