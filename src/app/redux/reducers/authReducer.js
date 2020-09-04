const initState = {
  currentUser: {},
  error: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SIGN_UP':
      return {
        ...state,
        currentUser: { ...action.payload },
      };
    case 'GET_AUTH_STATUS':
      return {
        ...state,
        currentUser: { ...action.payload },
      };
    case 'LOGIN':
      return {
        ...state,
        currentUser: { ...action.payload },
      };
    case 'LOGOUT':
      return {
        ...state,
        currentUser: {},
      };
    case 'GOOGLE_LOGIN':
      return {
        ...state,
        currentUser: { ...action.payload },
      };
    case 'AUTH_FAILED':
      return {
        ...state,
        error: action.payload,
      };
    case 'CLEAR_AUTH_FAILED_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
};

export default authReducer;
