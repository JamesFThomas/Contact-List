// Import React package and hooks
import React, { useContext} from 'react';
// Import React router dom package and hooks
import { Route, Redirect } from 'react-router-dom';
// Import auth context for access to state
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ component: Component, ...rest}) => {
  // Initialize context in component to access state
  const authContext = useContext(AuthContext);

  // Destructor actions/variables form context state
  const { isAuthenticated, loading } = authContext;

  return (
      <Route {...rest} render={props =>
        !isAuthenticated && !loading ? (
          < Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};


export default PrivateRoute;

