import React, {  useContext } from 'react'
import { authContext } from '../Context/Authentication'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute( { children } ) {
    const { token } = useContext(authContext);
    if (token === null) {
        return <Navigate to='/Login ' />
    }
    return <>

        {children}

    </>
}
