// Import React package and hooks
import React, { useContext, useRef, useEffect } from 'react'
// Import contact context to access contact state actions/variables
import ContactContext from '../../context/contact/contactContext'

const ContactFilter = () => {
  // Initialize Contact context in component
  const contactContext = useContext(ContactContext);
  // Destructor actions/values from contactContext state
  const { filterContacts, clearFilter, filtered } = contactContext;
  // Initialize userRef value
  const text = useRef('')

  // Function to autmatically reset filter input filed to blank
  useEffect(()=>{
    if(filtered === null){
      text.current.value = '';
    }
    // else{}
  }, [ filtered ]);

  // Function to filter contacts displayed by name or email
  const onChange = e => {
    if(text.current.value !== ''){
      filterContacts(e.target.value)
    }
    else {
      clearFilter();
    }
  };

  return (
    <form>
      <input ref={text} type='text' placeholder='Filter Contacts...' onChange={onChange}/>
    </form>
  )
}

export default ContactFilter;
