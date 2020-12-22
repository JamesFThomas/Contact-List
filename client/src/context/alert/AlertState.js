// Import React package with useReducer hook
import React, { useReducer } from 'react';
// Import uuid package to create custom ids
import {v4 as uuid} from 'uuid';
// Import auth context instance
import AlertContext from './alertContext';
// Import auth context reduce function to update state values
import alertReducer from './alertReducer';
// Import variables from types.js
import {
 SET_ALERT,
 REMOVE_ALERT
} from '../types';

const AlertState = (props) => {
  // Create initial attributes for the authenticate state object
  const initialState = [];

  // Initialize useReducer hook to access contacts state values
  const [state, dispatch] = useReducer(alertReducer, initialState);

                                            // Alert State Actions

    // Set Alert - will show alert message when error returned
      // wait param - allows you to set diff. display durations for diff. alerts
    const setAlert = (msg, type, wait = 5000) => {
      const id = uuid();
      dispatch({
        type: SET_ALERT,
        payload: {msg, type, id }
      });

      setTimeout(()=> dispatch({ type: REMOVE_ALERT, payload: id}), wait )
    };

    // Return alert context provider element
    return (
      <AlertContext.Provider
        // Set alert state & actions for access in app components
        value={{
          alerts: state,
          setAlert
        }}
        >
          {props.children}
        </AlertContext.Provider>
    )
};

export default AlertState;