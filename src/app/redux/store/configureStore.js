import {createStore} from 'redux';
import rootReducer from '../reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const configureStore = () => {
  const store = createStore(rootReducer, composeWithDevTools());
  return store;
}

export default configureStore;