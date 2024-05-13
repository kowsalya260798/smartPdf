import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSiteContext } from '../contexts/SiteProvider';
import { showNotification } from '../services/notifyService';
const PrivateRoute = React.memo(({ children, allowedRoles }) => {
  const { user } = useSiteContext();
  //nst user = false;
  // now ony implemeted user logged in or not.. has to impliment checking the roles
  if (!user) {
   // console.log("displayed twice");
   showNotification("error","unauthorized access");
    // not logged in so redirect to login page with the return url
    return <Navigate to="/login" />
  }
  return children;
});

export default PrivateRoute;