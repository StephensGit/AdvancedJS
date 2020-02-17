import {
  GET_COFFEE,
  GET_COFFEES,
  COFFEE_ERROR,
  CLEAR_COFFEE
} from '../actions/types';

const initialState = {
  coffee: null,
  coffees: [],
  // Once a request is made gets set to false
  loading: true,
  // To catch any errors in the request
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_COFFEE:
      return {
        ...state,
        coffee: payload,
        loading: false
      };
    // want to fill the empty array above in initial state for coffees
    case GET_COFFEES:
      return {
        ...state,
        coffees: payload,
        loading: false
      };
    case COFFEE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_COFFEE:
      return {
        ...state,
        coffee: null,
        loading: false
      };

    default:
      return state;
  }
}
