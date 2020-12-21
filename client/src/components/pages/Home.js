// Import React package
import React from 'react';
// Import Contacts component
import Contacts from '../contacts/Contacts';
// Import ContactForm Component
import ContactForm from '../contacts/ContactForm'
//Import
import ContactFilter from '../contacts/ContactFilter'


const Home = () => {
  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  )
}

export default Home;
