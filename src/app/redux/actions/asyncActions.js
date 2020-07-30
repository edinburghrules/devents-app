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

export {startLoading, stopLoading};