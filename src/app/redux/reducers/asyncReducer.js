const initState = {
  appLoaded: false,
  loading: false,
  loggingIn: false,
  googleLoggingIn: false,
  signingUp: false,
};

const asyncReducer = (state = initState, action) => {
  switch (action.type) {
    case 'APP_LOADED':
      return {
        ...state,
        appLoaded: true,
      };
    case 'START_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'STOP_LOADING':
      return {
        ...state,
        loading: false,
      };
    case 'START_LOGIN':
      return {
        ...state,
        loggingIn: true,
      };
    case 'START_GOOGLE_LOGIN':
      return {
        ...state,
        googleLoggingIn: true,
      };
    case 'STOP_LOGIN':
      return {
        ...state,
        loggingIn: false,
      };
    case 'STOP_GOOGLE_LOGIN':
      return {
        ...state,
        googleLoggingIn: false,
      };
    case 'START_SIGNUP':
      return {
        ...state,
        signingUp: true,
      };
    case 'STOP_SIGNUP':
      return {
        ...state,
        signingUp: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default asyncReducer;
