import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

export default function PrivateRoute({type, role, ...rest}){
    console.log("test private routing")
    if(!role || role!==type) return <Navigate to='/'></Navigate>
    return <Outlet/>
  }