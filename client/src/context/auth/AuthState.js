// Import React package with useReducer hook
import React, { useReducer } from 'react';
// Import axios package to make web requests
import axios from 'axios';
// Import auth context instance
import AuthContext from './authContext';
// Import auth context reduce function to update state values
import authReducer from './authReducer';
// Import setAuthToken function
import setAuthToken from '../../utils/setAuthToken'
// Import variables from types.js
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

const AuthState = (props) => {
  // Create initial attributes for the authenticate state object
  const initialState = {
    // create key to hold web token
    token: localStorage.getItem('token'),
    // variable to indicate if user is authorized/logged in
    isAuthenticated: null,
    // key to indicate request in progress
    loading: true,
    // key to indicate presence of any returned errors
    error: null,
    // key to indicate current user
    user: null
  };

  // Initialize useReducer hook to access contacts state values
  const [state, dispatch] = useReducer(authReducer, initialState);

                                            // Auth State Actions

    // Load User - checks if a user is logged in
    const loadUser = async () => {
      // Check for presence of web token
      if(localStorage.token){
        // If present - set token to global header
        setAuthToken(localStorage.token);
      }

      // Axios request to backend for user data
      try {
        // create variable set to return value of user auth attempt
        const res = await axios.get('api/auth');

        // If successful dispatch returned user data to reducer
        dispatch({
          type: USER_LOADED,
          payload: res.data
        })
      } catch (error) {
        // If fail dispatch error data to reducer
        dispatch({ type: AUTH_ERROR  });
      }
    };

    // Register User - sign user up and return token
    const registerUser = async (formData) => {
      // create config object to specify content type in post request
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      try {
        // Create variable set to response from POST request
        const res = await axios.post('api/users', formData, config);

        // If register successful
            // Set dispatch type and payload to reducer
        dispatch({
          type:REGISTER_SUCCESS,
          payload: res.data      // (web token) for authentication
        });

        // Call load user
        loadUser();

      } catch (error) {
        // If register is a Failure
        dispatch({
          type:REGISTER_FAIL,
          payload: error.response.data.msg
        });
      }
    }

    // Login User - login user in and receive token
    const loginUser = async (formData) =>{ // create config object to specify content type in post request
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      try {
        // Create variable set to response from POST request
        const res = await axios.post('api/auth', formData, config);

        // If register successful
            // Set dispatch type and payload to reducer
        dispatch({
          type:LOGIN_SUCCESS,
          payload: res.data      // (web token) for authentication
        });

        // Call load user
        loadUser();

      } catch (error) {
        // If register is a Failure
        dispatch({
          type:LOGIN_FAIL,
          payload: error.response.data.msg
        });
      }}

    // Logout - will destroy user token
    const logoutUser = () =>{ console.log('logout user')}

    // Clear Errors- will clear any returned errors
    const clearErrors = () =>{
      dispatch(
        // dispatch object to reducer with type indicating to clear errors
        { type: CLEAR_ERRORS }
      )
    };

    // Return auth context provider element
    return (
      <AuthContext.Provider
        // Set auth state & actions for access in app components
        value={{
          token:state.token,
          isAuthenticated: state.isAuthenticated,
          loading: state.loading,
          user: state.user,
          error: state.error,
          loadUser,
          registerUser,
          loginUser,
          logoutUser,
          clearErrors
        }}
        >
          {props.children}
        </AuthContext.Provider>
    )
};

export default AuthState;