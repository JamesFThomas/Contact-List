// Import react package and hooks
import React, { Fragment } from 'react';
// Import react router and methods
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// Import Navbar component
import Navbar from './components/layout/Navbar';
// Import Home page component
import Home from './components/pages/Home';
// Import About page component
import About from './components/pages/About';
// Import Register page component
import Register from './components/auth/Register';
// Import Login page component
import Login from './components/auth/Login';
// Import Alert component
import Alerts from './components/layout/Alerts';
// Import contact state provider object
import ContactState from './context/contact/ContactState';
// Import auth state provider object
import AuthState from './context/auth/AuthState';
// Import alert state provider object
import AlertState from './context/alert/AlertState';
//Import setAuthToken function
import setAuthToken from './utils/setAuthToken'
// Import CSS stylesheet for UI design
import './App.css';

// Check for presence of web token
if(localStorage.token){
  // If present - set token to global header
  setAuthToken(localStorage.token);
}

// Create Return Main application component/ origin point
const App = () =>{
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
                <div className='container'>
                  <Alerts />
                  <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/about' component={About} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                  </Switch>
                </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

// Export main component to use in reactDom function to render to browser
export default App;
