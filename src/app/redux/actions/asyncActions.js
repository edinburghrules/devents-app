const startLoading = () => {
  return {
    type: 'START_LOADING'
  }
}

const stopLoading = () => {
  return {
    type: 'STOP_LOADING'
  }
}

const startLogin = () => {
  return {
    type: 'START_LOGIN'
  }
}

const startGoogleLogin = () => {
  return {
    type: 'START_GOOGLE_LOGIN'
  }
}

const stopLogin = () => {
  return {
    type: 'STOP_LOGIN'
  }
}

const stopGoogleLogin = () => {
  return {
    type: 'STOP_GOOGLE_LOGIN'
  }
}

const startSignUp = () => {
  return {
    type: 'START_SIGNUP'
  }
}

const stopSignUp = () => {
  return {
    type: 'STOP_SIGNUP'
  }
}

export {startLoading, stopLoading, startLogin, startGoogleLogin, stopLogin, stopGoogleLogin, startSignUp, stopSignUp };