import React from 'react';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom'

const Navbar = ({ title, icon }) => {

  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon}/> {title}
      </h1>
      <ul>
        <li>
          <Link to='/'> Home </Link>
        </li>
        <li>
          <Link to='/about'> About </Link>
        </li>
      </ul>

    </div>
  )
};

// This object sets the required data types for the props object
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
}

// Default props allows us to set up default state objects for application display
Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt'

}

export default Navbar;
