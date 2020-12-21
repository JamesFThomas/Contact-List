// Import React package and methods
import React, { Fragment, useContext} from 'react';
// Import transition animation package for additional UI effects
import {CSSTransition, TransitionGroup } from 'react-transition-group';

// Import ContactItem component to display contact info
import ContactItem from './ContactItem'
// Import contact context to access state globally
import ContactContext from '../../context/contact/contactContext';

export const Contacts = () => {
  // Initiate contact context in the component to access contact state variables/methods
  const contactContext = useContext(ContactContext);

  // Deconstruct state actions/variables from contact context
  const { contacts, filtered } = contactContext;

  // Conditional message prompting user to enter contact if none are persisted
  if(!contacts.length){
    return <h4> PLease enter a contact</h4>
  }

  return (
    <Fragment>
      <TransitionGroup>

      {/* Conditionally render filtered contacts array based on contact state "filtered" key value */}
      {filtered !== null
        ? filtered.map(contact => (
          <CSSTransition key={contact.id} timeout={700} classNames='item'>
            < ContactItem contact={contact}/>
          </CSSTransition>
          ))
          : contacts.map((contact) => (
            <CSSTransition key={contact.id} timeout={700} classNames='item'>
              < ContactItem contact={contact}/>
            </CSSTransition>
          ))}
      </TransitionGroup>
    </Fragment>
  )
}

export default Contacts;