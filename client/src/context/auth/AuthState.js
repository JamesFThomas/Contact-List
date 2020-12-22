// Import React package with useReducer hook
import React, { useReducer } from 'react';
// Import auth context instance
import AuthContext from './authContext';
// Import auth context reduce function to update state values
import AuthReducer from './authReducer';
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
  const [state, dispatch] = useReducer(AuthReducer, initialState);

                                            // Auth State Actions

    // Load User - checks if a user is logged in
    const loadUser = () =>{}

    // Register User - sign user up and return token
    const registerUser = () =>{}

    // Login User - login user in and receive token
    const loginUser = () =>{}

    // Logout - will destroy user token
    const logoutUser = () =>{}

    // Clear Errors- will clear any returned errors
    const clearErrors = () =>{}

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