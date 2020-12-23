// Import React package
import React, { useContext, useEffect } from 'react';
// Import Contacts component
import Contacts from '../contacts/Contacts';
// Import ContactForm Component
import ContactForm from '../contacts/ContactForm';
//Import contactFilter component
import ContactFilter from '../contacts/ContactFilter';
//Import auth context file
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  // Initialize context in component
  const authContext = useContext(AuthContext);

  // Destructor actions / variables from context sate object
  const { loadUser } = authContext;

  //Initialize useEffect
  useEffect(()=>{
    loadUser();
    //eslint-disable-next-line
  }, [])
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
