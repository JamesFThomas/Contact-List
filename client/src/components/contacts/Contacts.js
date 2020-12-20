// Import React package and methods
import React, { Fragment, useContext} from 'react';
// Import contact context to access state globally
import ContactContext from '../../context/contact/contactContext';

export const Contacts = () => {
  // Initiate contact context in the component to access contact state variables/methods
  const contactContext = useContext(ContactContext);

  // Deconstruct state variable from contact context
  const { contacts } = contactContext;


  return (
    <Fragment>
      {contacts.map((contact) => (
        <h3>{contact.name}</h3>
      ))}
    </Fragment>
  )
}

export default Contacts;