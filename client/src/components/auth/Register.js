// Import React package and hooks
import React, { useState, useContext } from 'react'
// Import alert context
import AlertContext from '../../context/alert/alertContext';


const Register = () => {
  // Initialize context to access alert state actions & variables
  const alertContext = useContext(AlertContext);

  // Destructor alert actions and values from context object
  const { setAlert } = alertContext;

  // Initialize useSate hook and variables for register form
  const [user, setUser] = useState({
      name: '',
      email: '',
      password: '',
      password2: ''
  });

  // Deconstruct values from useState user object
  const { name, email, password, password2 } =  user;

  // Function - to add values to form text fields
  const onChange = (e) =>{
    setUser({ ...user, [e.target.name]: e.target.value});
  }

  // Function - to capture and text field values
  const onSubmit = (e) => {
    e.preventDefault();
    // return alerts based on form field data
    if( name === '' || email === '' || password === '' ){
      // return message if data missing
      setAlert('Please enter all fields', 'danger');
    }
    else if( password !== password2){
      // return message if passwords not same
      setAlert('Passwords do not match', 'danger')
    }
    else{
      // return success message when form submitted
      console.log('Register submit');
    }
  }

  // Return component html template to render to DOM
  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register User</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>User Name</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  )
}

// Export Register component for use in application
export default Register;
