const initState = {
  currentUser: {},
  userProfile: {},
  errMsg: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SIGN_UP':
      return {
        ...state,
        currentUser: { ...action.payload }
      };
    case 'GET_AUTH_STATUS':
      return {
        ...state,
        currentUser: { ...action.payload }
      };
    case 'LOAD_USER_PROFILE':
      return {
        ...state,
        userProfile: { ...action.payload }
      };
    case 'LOGIN':
      return {
        ...state,
        currentUser: { ...action.payload }
      };
    case 'LOGOUT':
      return {
        currentUser: {},
        userProfile: {}
      };
    case 'GOOGLE_LOGIN':
      return {
        currentUser: { ...action.payload }
      };
    case 'LOGIN_FAILED':
      return {
        ...state,
        errMsg: action.payload
      }
    case 'SIGNUP_FAILED':
      return {
        ...state,
        errMsg: action.payload
      }
    case 'UPDATE_USER_PROFILE':
      return {
        ...state,
        userProfile: {...action.payload}
      }
    default:
      return state
  }
};

export default authReducer;
