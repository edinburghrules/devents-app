import { combineReducers } from 'redux';
import eventReducer from './eventReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import asyncReducer from './asyncReducer';

const rootReducer = combineReducers({
  events: eventReducer,
  auth: authReducer,
  profile: userReducer,
  async: asyncReducer,
});

export default rootReducer;
