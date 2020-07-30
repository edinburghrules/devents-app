import { combineReducers } from 'redux';
import eventReducer from './eventReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import asyncReducer from './asyncReducer';

const rootReducer = combineReducers({
  events: eventReducer,
  user: authReducer, 
  profile: profileReducer,
  async: asyncReducer
})

export default rootReducer;