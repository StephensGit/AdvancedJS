import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// bringing in this to combine all reducers,(index.js in reducers folder)
import rootReducer from './reducers';

// initial state is an empty object
const initialState = {};

const middleware = [thunk];

// craeteStore takes in 3 parameters
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
