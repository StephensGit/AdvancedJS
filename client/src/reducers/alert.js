// This is a just a function that takes in a piece of state, any state that has to do with alert and an action.
// An acion is going to get dispatched from an action file

import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // Dispatch this type to set alerts and return the array with the payload with the new alert
    case SET_ALERT:
      return [...state, payload];
    // Remove is going to filter through and it's going to return all alerts except the one that matches the payload
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
