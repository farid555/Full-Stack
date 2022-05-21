import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useRedux';

const PrivateRouteUser = () => {
  const { user } = useAppSelector((state) => state.auth);
    if(user) {
        return <Outlet />; 
    } else {
       return <Navigate to="/login" />
    }
}

export default PrivateRouteUser