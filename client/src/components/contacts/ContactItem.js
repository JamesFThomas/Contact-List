// Import React package
import React from 'react'

const ContactItem = ({ contact }) => {
  // Deconstruct contact information from props
  const { id, name, email, phone, type } = contact;
  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {/* Display contact name and a badge conditionally on "type" of contact  */}
        {name}{' '} <span className={'badge ' + (type === 'professional' ? 'badge-success':'badge-primary')}>{type}</span>
      </h3>
    </div>
  )
}

export default ContactItem;