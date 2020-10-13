const initState = {
  userProfile: {},
  error: null,
  usersCollection: [],
  userCoords: null
};

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state, 
        usersCollection: [...action.payload]
      }
    case 'LOAD_USER_PROFILE':
      return {
        ...state,
        userProfile: { ...action.payload },
      };
    case 'UPDATE_USER_PROFILE':
      return {
        ...state,
        usersCollection: [...state.usersCollection.filter(user => user.id !== action.payload.uid), {...action.payload, id: action.payload.uid}],
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
        ...state,
        userProfile: {},
        error: null, 
      };
    case 'USER_COORDS':
      return {
        ...state,
        userCoords: action.payload
      }
    default:
      return state;
  }
};

export default profileReducer;
