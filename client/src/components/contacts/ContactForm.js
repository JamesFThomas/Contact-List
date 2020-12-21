// Import React package & hooks
import React, { useContext, useState, useEffect } from 'react'
// Import contact conetext tp access contact state globally
import ContactContext from '../../context/contact/contactContext';
import { CLEAR_CURRENT } from '../../context/types';


const ContactForm = () => {
  // Initialize contact context to access contact state
  const contactContext = useContext(ContactContext);

  // Destructor functions from contactContext
  const { addContact, updateContact, clearCurrent, current } = contactContext;

  // React hook will automatically load contact information to form based on "current" value
  useEffect(()=>{
    if(current !== null){
      setContact(current);
    }
    else {
      setContact({
        name:'',
        email:'',
        phone:'',
        type:'personal',
      });
    }
  }, [contactContext, current]);

  // Initialize useState hook and variables
   // Setting a form in the useState() hook allows us not to have to create hook for each form field
   const [contact, setContact] = useState({
    name:'',
    email:'',
    phone:'',
    type:'personal',
  });

  // Destruct form fields from contact variable in useState hook
  const { name, email, phone, type } = contact;

  // Function to update component level state with form values
  const onChange =(e)=>{
    setContact({...contact, [e.target.name]:e.target.value })
  };

  // Function to update global Application state with form values
  const onSubmit =(e)=>{
    // prevent fields from whipping input values
    e.preventDefault();
    // Check the value of the "current" key in contact context
    if( current === null){
      // if value is null, invoke addContact() to persist contact information
      addContact(contact);
    }
    else {
      // if value !null, invoke updateContact() to alter persisted contacts information
      updateContact(contact);
    }
    // reset form fields to initial state, " "
    clearAll();
  };

  // Function clear all form fields + set "current" = null
  const clearAll = () =>{
    clearCurrent();
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {/* Form will conditionally render title based on state "current" value */}
        { current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type='text'
        placeholder='name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
        <input
          type='radio'
          name='type'
          value='personal'
          checked={type === 'personal'}
          onChange={onChange}
        /> Personal {''}
        <input
          type='radio'
          name='type'
          value='professional'
          checked={type === 'professional'}
          onChange={onChange}
          />
          {''} Professional
        <div>
          <input
              className='btn btn-primary btn-block'
              type='submit'
              // Button will conditionally render text based on state "current" value
              value={ current ? 'Update Contact' : 'Add Contact'}
          />
        </div>
          {/* Form will conditionally render a clear button based on state "current" value  */}
          { current &&
            <div>
              <button
                className='btn btn-light btn-block'
                onClick={clearAll}
              >
                Clear
              </button>
            </div>}
    </form>
  )
}

export default ContactForm;
