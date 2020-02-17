// Root Reducer
import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import coffee from './coffee';

export default combineReducers({
  alert,
  auth,
  coffee
});
