const initState = {
  appLoaded: false,
  loading: false,
  upLoading: false,
  authorizing: false,
  googleAuthorizing: false,
  submitting: false,
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
    case 'START_UPLOADING':
      return {
        ...state,
        upLoading: true,
      };
    case 'STOP_UPLOADING':
      return {
        ...state,
        upLoading: false,
      };
    case 'START_AUTHORISING':
      if (action.payload === 'googleLogin') {
        return {
          ...state,
          googleAuthorizing: true,
        };
      } else {
        return {
          ...state,
          authorizing: true,
        };
      }
    case 'STOP_AUTHORISING':
      return {
        ...state,
        authorizing: false,
        googleAuthorizing: false,
      };
    case 'START_SUBMIT':
      return {
        ...state,
        submitting: true,
      };
    case 'STOP_SUBMIT':
      return {
        ...state,
        submitting: false,
      };
    case 'START_SEARCH':
      return {
        ...state,
        searching: true,
      };
    case 'STOP_SEARCH':
      return {
        ...state,
        searching: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default asyncReducer;
