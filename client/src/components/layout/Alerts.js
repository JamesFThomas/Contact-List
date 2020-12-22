// Import react package and hooks
import React, { useContext } from 'react';
// Import alert context object
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  // Initialize alert context for access to alert state actions/attributes
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 && alertContext.alerts.map( alert => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle'></i> {alert.msg}
      </div>
    ))
  )
}

export default Alerts;
