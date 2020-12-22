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
// Import contact state provider object
import ContactState from './context/contact/ContactState';
// Import auth state provider object
import AuthState from './context/auth/AuthState';
// Import CSS stylesheet for UI design
import './App.css';

// Create Return Main application component/ origin point
const App = () =>{
  return (
    <AuthState>
      <ContactState>
        <Router>
          <Fragment>
            <Navbar />
              <div className='container'>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                </Switch>
              </div>
          </Fragment>
        </Router>
      </ContactState>
    </AuthState>
  );
}

// Export main component to use in reactDom function to render to browser
export default App;
