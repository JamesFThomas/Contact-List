// IMpoet React package and hooks
import React, { Fragment, useContext } from 'react';
// Import prop types package to require data types
import PropTypes from "prop-types";
// Import Link element from react dom router package
import {Link} from 'react-router-dom'
// Import auth context object
import AuthContext from '../../context/auth/authContext';


const Navbar = ({ title, icon }) => {
  // Initialize context object in component
  const authContext = useContext(AuthContext);

  // Destructor actions/ variable from context state object
  const { isAuthenticated, logoutUser, user} = authContext;

  // Split visible links based on user authentication
  const authLinks = (
    <Fragment>
      <li> Hello { user && user.name}</li>
      <li>
        <a href='#!'>
          <i className='fas fa-sign-out-alt'></i> <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
)

  const guestLinks = (
    <Fragment>
      <li>
          <Link to='/register'> Register </Link>
        </li>
        <li>
          <Link to='/login'> Login </Link>
        </li>
    </Fragment>
  )
  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon}/> {title}
      </h1>
      <ul>
        {/* Conditionally Render Links */}
        { isAuthenticated ? authLinks : guestLinks }
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

