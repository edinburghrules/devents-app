const initState = {
  userProfile: {}
};


const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOAD_USER_PROFILE':
      return {
        ...state,
        userProfile: { ...action.payload }
      };
    case 'UPDATE_USER_PROFILE':
      return {
        ...state,
        userProfile: {...action.payload}
      }
    default:
      return state
  }
};

export default profileReducer;