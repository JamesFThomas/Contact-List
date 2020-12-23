// Import React package and methods
import React, { Fragment, useContext, useEffect} from 'react';
// Import transition animation package for additional UI effects
import {CSSTransition, TransitionGroup } from 'react-transition-group';

// Import ContactItem component to display contact info
import ContactItem from './ContactItem'
//Import Spinner component
import Spinner from '../layout/Spinner'
// Import contact context to access state globally
import ContactContext from '../../context/contact/contactContext';

export const Contacts = () => {
  // Initiate contact context in the component to access contact state variables/methods
  const contactContext = useContext(ContactContext);

  // Deconstruct state actions/variables from contact context
  const { contacts, filtered, getContacts, loading } = contactContext;

  // Hooks will retrieve users' contacts on component render
  useEffect(()=>{
    getContacts();
    //eslint-disable-next-line
  },  [])

  // Conditional message prompting user to enter contact if none are persisted
  if(contacts !== null && !contacts.length && !loading){
    return <h4> PLease enter a contact</h4>
  }

  return (
    <Fragment>
      {/* Conditionally render spinner gif */}
      { contacts !== null && !loading ? (<TransitionGroup>

{/* Conditionally render filtered contacts array based on contact state "filtered" key value */}
{filtered !== null
  ? filtered.map(contact => (
    <CSSTransition key={contact._id} timeout={700} classNames='item'>
      < ContactItem contact={contact}/>
    </CSSTransition>
    ))
    : contacts.map((contact) => (
      <CSSTransition key={contact._id} timeout={700} classNames='item'>
        < ContactItem contact={contact}/>
      </CSSTransition>
    ))}
</TransitionGroup>): < Spinner/>}
    </Fragment>
  )
}

export default Contacts;