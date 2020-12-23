// Import axios package for http request
import axios from 'axios';

// Function will _ checks for presence of web token

const setAuthToken = token =>{
  // If found - sets token to global header
  if(token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  }
  else {
    // If NOT found - delete from global header
    delete axios.defaults.headers.common['x-auth-token'];
  }
};


// export function for use in application routes
export default setAuthToken;
