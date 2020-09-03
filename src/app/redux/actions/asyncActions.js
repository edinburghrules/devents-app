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

const startAuthorising = () => {
  return {
    type: 'START_AUTHORISING'
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
