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

const startUpLoading = () => {
  return {
    type: 'START_UPLOADING',
  };
};

const stopUpLoading = () => {
  return {
    type: 'STOP_UPLOADING',
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
  startUpLoading, 
  stopUpLoading,
  startAuthorising,
  stopAuthorising,
  startSubmit,
  stopSubmit
};
