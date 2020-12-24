// Import React package and hooks
import React, { useState, useContext, useEffect } from 'react'
// Import auth context
import AuthContext from '../../context/auth/authContext';
// Import alert context
import AlertContext from '../../context/alert/alertContext';


const Login = ( props ) => {
  // Initialize context to access alert state actions & variables
  const alertContext = useContext(AlertContext);
  // Initialize context to access auth state actions & variables
  const authContext = useContext(AuthContext);

  // Destructor actions and values from context objects
  const { setAlert } = alertContext;
  const { clearErrors, isAuthenticated, error, loginUser } = authContext;

  // Initialize useEffect hook to check for set data conditions
  useEffect(()=> {
    if(isAuthenticated){
      // If user is authenticated redirect to home page
      props.history.push('/')
    }
    if( error === 'Invalid User Email' || error === 'Invalid User Password' ){
        setAlert(error, 'danger');
        clearErrors();
    };
    //eslint-disable-next-line
  },[ error, isAuthenticated, props.history ])



  // Initialize useSate hook and variables for register form
  const [user, setUser] = useState({
      email: '',
      password: '',
  });

  // Deconstruct values from useState user object
  const { email, password } =  user;

  // Function - to add values to form text fields
  const onChange = (e) =>{
    setUser({ ...user, [e.target.name]:e.target.value});
  }

  // Function - to capture and text field values
  const onSubmit = (e) => {
    // Prevent input field from resetting to blank
    e.preventDefault();
    // Check to ensure all form fields have been completed
    if(email === '' || password === ''){
      // If required credentials not present
      setAlert('PLease fill in all form fields', 'danger');
    }
    else{
      // If required data present log user in
      loginUser({ email, password });
    }
  };

  // Return component html template to render to DOM
  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>User Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input type='email' name='email' value={email} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' value={password} onChange={onChange} />
        </div>
        <input type='submit' value='Login' className='btn btn-primary btn-block' />
      </form>
      <div>
        <br/>
        <p> This application is <strong>FREE</strong> </p>
        <p> Sign-up to create an account</p>
        <p> Start tracking your contacts</p>
      </div>
    </div>
  )
}

// Export Login component for use in application
export default Login;
