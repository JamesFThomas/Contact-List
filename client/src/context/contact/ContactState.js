// Import React package with useReducer hook
import React, { useReducer } from 'react';
// Import axios
import axios from 'axios'
// Import uuid package to create custom ids
import {v4 as uuid} from 'uuid';
// Import contact context instance
import ContactContext from './contactContext';
// Import contact context reduce function to update state values
import ContactReducer from './contactReducer';
// Import variables from types.js
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  CLEAR_FILTER,
  FILTER_CONTACTS,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS
} from '../types';

const ContactState = (props) => {
  // Create initial attributes/values for the contact state object
  const initialState = {
    // Will serve as a space to hold contacts made in UI
    contacts: null,
    // state attribute to hold user data for current application action i.e. updating, deleting
    current: null,
    // State attribute to hold returned list of contacts filtered by search params
    filtered: null,
    //state attribute to hold any returned error messages
    error: null
  };

  // Initialize useReducer hook to access contacts state values
  const [state, dispatch] = useReducer(ContactReducer, initialState);

                                            // Contact State Actions
    // GET user contacts
    const getContacts = async () =>{
      try {
        // Create variable set to return value of adding contact to database
        const res = await axios.get('/api/contacts')

        // If successful dispatch user data to reducer for state update
        dispatch({ type: GET_CONTACTS, payload: res.data })

      } catch (error) {
        // If unsuccessful dispatch error message to reducer
        dispatch({ type: CONTACT_ERROR, payload: error.response.msg  })
      }
   };


    // ADD a contact
    const addContact = async contact =>{
      // Config request headers
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      try {
        // Create variable set to return value of adding contact to database
        const res = await axios.post('/api/contacts', contact, config)

        // If successful dispatch user data to reducer for state update
        dispatch({ type: ADD_CONTACT, payload: res.data })

      } catch (error) {
        // If unsuccessful dispatch error message to reducer
        dispatch({ type: CONTACT_ERROR, payload: error.response.msg  })
      }

    };

    // DELETE a contact,
    const deleteContact = async id =>{
      try {
        // make delete request to API
        await axios.delete(`/api/contacts/${id}`)

        // If successful dispatch user id to reducer for state update
        dispatch({ type: DELETE_CONTACT, payload: id })

      } catch (error) {
        // If unsuccessful dispatch error message to reducer
        dispatch({ type: CONTACT_ERROR, payload: error.response.msg  })
      }
    };

    // Clear contacts
    const clearContacts = () =>{
      dispatch({ type: CLEAR_CONTACTS })
    };

    // FUNCTION - will SET a contact as the value of the "current" state key for editing
    const setCurrent = contact =>{
      dispatch({ type: SET_CURRENT, payload: contact })
    };

    // FUNCTION - will CLEAR a contact as the "current" key value and set it back to null
    const clearCurrent = () =>{
      dispatch({ type: CLEAR_CURRENT })
    };

    // UPDATE the contact,
    const updateContact = contact =>{
      dispatch({ type: UPDATE_CONTACT, payload: contact })
    };

    // FILTER contacts
    const filterContacts = text =>{
      dispatch({ type: FILTER_CONTACTS, payload: text })
    };

    // Clear Filter
    const clearFilter = () =>{
      dispatch({ type: CLEAR_FILTER })
    };

    // Return contact context provider element
    return (
      <ContactContext.Provider
        // Set contact state & actions for access in app components
        value={{
          contacts: state.contacts,
          current: state.current,
          filtered: state.filtered,
          error: state.error,
          addContact,
          getContacts,
          deleteContact,
          setCurrent,
          clearCurrent,
          updateContact,
          filterContacts,
          clearFilter,
          clearContacts
        }}
        >
          {props.children}
        </ContactContext.Provider>
    )
};

export default ContactState;