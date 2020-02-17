// This function takes in a token, if the token is there it's going to add it to the headers.
// If not it's going to delete it from the headers

// Not making a request, just adding a global header
import axios from 'axios';

// Function takes token as a parameter, the token passed in is from local storage
// So the check below will look to see if there's a token in local storage
// If so set the global header x-auth-token to the token
// If what is passed in is not a token delete it
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
