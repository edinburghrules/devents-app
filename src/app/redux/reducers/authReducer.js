const initState = {
  currentUser: {},
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
    case 'LOGIN':
      return {
        ...state,
        currentUser: { ...action.payload }
      };
    case 'LOGOUT':
      return {
        ...state,
        currentUser: {}
      };
    case 'GOOGLE_LOGIN':
      return {
        ...state,
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
    default:
      return state
  }
};

export default authReducer;
