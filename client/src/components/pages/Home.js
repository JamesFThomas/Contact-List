// Import React package
import React from 'react';
// Import Contacts component
import Contacts from '../contacts/Contacts';
// Import ContactForm Component
import ContactForm from '../contacts/ContactForm'


const Home = () => {
  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <Contacts />
      </div>
    </div>
  )
}

export default Home;
