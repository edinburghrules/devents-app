const initState = {
  userProfile: {},
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
    case 'LOGOUT':
      return {
        userProfile: {},
      };
    default:
      return state;
  }
};

export default profileReducer;
