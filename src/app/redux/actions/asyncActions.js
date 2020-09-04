const startLoading = () => {
  return {
    type: 'START_LOADING',
  };
};

const stopLoading = () => {
  return {
    type: 'STOP_LOADING',
  };
};

const startAuthorising = (loginType) => {
  return {
    type: 'START_AUTHORISING',
    payload: loginType
  }
}

const stopAuthorising = () => {
  return {
    type: 'STOP_AUTHORISING',
  };
};

const startSubmit = () => {
  return {
    type: 'START_SUBMIT'
  }
}

const stopSubmit = () => {
  return {
    type: 'STOP_SUBMIT'
  }
}

export {
  startLoading,
  stopLoading,
  startAuthorising,
  stopAuthorising,
  startSubmit,
  stopSubmit
};
