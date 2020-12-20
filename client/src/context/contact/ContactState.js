// Import React package with useReducer hook
import React, { useReducer } from 'react';
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
  CLEAR_FILTER
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id:1,
        name: 'James Thomas',
        email: 'jamest@email.com',
        phone: '111-111-1111',
        type: 'personal'
      },
      {
        id:2,
        name: 'Kayla Turner',
        email: 'kaylat@email.com',
        phone: '222-222-2222',
        type: 'personal'
      },
      {
        id:3,
        name: 'Hunter Gunner',
        email: 'huntert@email.com',
        phone: '333-333-3333',
        type: 'professional'
      }
    ]
  };

  // Initialize useReducer hook to access contacts state values
  const [state, dispatch] = useReducer(ContactReducer, initialState);

                                            // Contact State Actions

    // ADD a contact
    const addContact = contact =>{
      contact.id = uuid();
      dispatch({ type: ADD_CONTACT, payload: contact })
    };
    // DELETE a contact,
    const deleteContact = id =>{
      dispatch({ type: DELETE_CONTACT, payload: id })
    };

    // SET the current contact,
    // UPDATE the contact,
    // FILTER contacts
    // CLEAR the filter

    // Return contact context provider element
    return (
      <ContactContext.Provider
        // Set contact state & actions for access in app components
        value={{
          contacts: state.contacts,
          addContact,
          deleteContact
        }}
        >
          {props.children}
        </ContactContext.Provider>
    )
};

export default ContactState;