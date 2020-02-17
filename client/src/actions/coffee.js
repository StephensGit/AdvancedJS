import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_COFFEE,
  GET_COFFEES,
  COFFEE_ERROR,
  CLEAR_COFFEE,
  COFFEE_DELETED
} from './types';

// Get all coffee shops
export const getCoffees = () => async dispatch => {
  // Clear current coffee
  dispatch({ type: CLEAR_COFFEE });
  try {
    const res = await axios.get('/api/coffees');

    dispatch({
      type: GET_COFFEES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COFFEE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get coffee shops by id - note, it gets it by user id becasue that's the FK in coffees collection
export const getCoffeeById = userId => async dispatch => {
  // dispatch({ type: CLEAR_COFFEE });
  try {
    const res = await axios.get(`/api/coffees/user/${userId}`);

    dispatch({
      type: GET_COFFEE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COFFEE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get current users coffee shop
export const getCurrentCoffee = () => async dispatch => {
  try {
    const res = await axios.get('/api/coffees/me');

    dispatch({
      type: GET_COFFEE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COFFEE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create/ Update Coffee Shop
// Redirects after form is submitted,
// pass in the history object which has a method called push that will redirect to a client side route
// edit is used to know if the coffee shop is being updated, edited or creating a new one
export const createCoffee = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/coffees', formData, config);

    dispatch({
      type: GET_COFFEE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Coffee Updated ' : 'Coffee Created', 'success'));

    // Cant use redirect in an action, must use history object
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    // Will display an error in an alert if a field is empty
    const errors = err.response.data.errors;

    if (errors) {
      // On each error displays the corresponding error msg
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      console.log(err.msg);
    }
    dispatch({
      type: COFFEE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Coffee
export const deleteCoffee = () => async dispatch => {
  // Only using this because delete can't be undone
  if (
    window.confirm('Are you sure you want to delete, this cannot be undone!')
  ) {
    // end point is delete request
    try {
      await axios.delete('/api/coffees');

      dispatch({ type: CLEAR_COFFEE });
      dispatch({ type: COFFEE_DELETED });

      // Alert to notify user it's successfully deleted
      dispatch(setAlert('Your coffee has been deleted sucker'));
    } catch (err) {
      dispatch({
        type: COFFEE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
