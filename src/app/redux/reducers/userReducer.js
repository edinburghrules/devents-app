const initState = {
  userProfile: {},
  error: null
};

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOAD_USER_PROFILE':
      return {
        userProfile: { ...action.payload },
      };
    case 'UPDATE_USER_PROFILE':
      return {
        userProfile: { ...action.payload },
      };
    case 'PROFILE_UPDATE_ERROR':
      return {
        ...state,
        error: {...action.payload}
      }
    case 'CLEAR_PROFILE_UPDATE_ERROR':
      return {
        ...state,
        error: null
      }
    case 'LOGOUT':
      return {
        userProfile: {},
      };
    default:
      return state;
  }
};

export default profileReducer;
