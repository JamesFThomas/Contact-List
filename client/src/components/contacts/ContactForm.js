import { STATES } from 'mongoose';
import React, { useState } from 'react'

const ContactForm = () => {
  // Initialize useState hook and variables
   // Setting a form in the useState() hook allows us not to have to create hook for each form field
  const [contact, setContact] = useState({
    name:'',
    email:'',
    phone:'',
    type:'personal',
  })

  // Destruct form fields from contact variable in useState hook
  const { name, email, phone, type } = contact;

  // Function to update state with form values
  const onChange =(e)=>{
    setContact({...contact, [e.target.name]:e.target.value })
  };

  return (
    <form>
      <h2 className='text-primary'>Add Contact</h2>
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
        <input type='radio' name='type' value='personal' checked={type === 'personal'} /
        > Personal{''}
        <input type='radio' name='type' value='professional' checked={type === 'professional'} /
        > Professional
        <div>
          <input className='btn btn-primary btn-block' type='submit' value='Add Contact' />
        </div>
    </form>
  )
}

export default ContactForm;
