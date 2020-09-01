const initState = [];

const eventReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_EVENTS':
      return action.payload;
    case 'CREATE_EVENT':
      return [...state, action.payload];
    case 'EDIT_EVENT':
      return [
        ...state.filter((event) => event.id !== action.payload.id),
        action.payload,
      ];
    default:
      return state;
  }
};

export default eventReducer;
