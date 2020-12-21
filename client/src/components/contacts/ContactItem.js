// Import React package
import React, { useContext } from 'react'
// Import propTypes package
import PropTypes from 'prop-types';
// Import ContactContext state
import ContactContext from '../../context/contact/contactContext';


const ContactItem = ({ contact }) => {
  // Initialize contact context to manipulate contact state
  const contactContext = useContext(ContactContext)

  // Deconstruct deleteContact action from contactContext
  const { deleteContact, setCurrent, clearCurrent } = contactContext

  // Deconstruct contact information from props
  const { id, name, email, phone, type } = contact;

  // Function will delete user contact from list
  const onDelete = () =>{
    // delete selected contact by id number
    deleteContact(id);
    // reset current key to null
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {/* Display contact name and a badge conditionally on "type" of contact  */}
        {name}{' '}
        <span style={{ float: 'right' }}
          className={'badge ' +
          (type === 'professional' ? 'badge-success':'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && ( <li>
          <i className='fas fa-envelope-open'></i> {email}
        </li>)}
        {phone && ( <li>
          <i className='fas fa-phone'></i> {phone}
        </li>)}
      </ul>
      <p>
        <button className='btn btn-dark btn-sm' onClick={()=> setCurrent(contact)}> Edit </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}> Delete </button>
      </p>
    </div>
  )
}

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem;