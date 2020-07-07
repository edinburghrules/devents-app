import { combineReducers } from 'redux';
import eventReducer from './eventReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
  events: eventReducer,
  user: authReducer, 
  profile: profileReducer
})

export default rootReducer;