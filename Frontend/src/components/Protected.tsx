import React from 'react'
import { useUser } from '../contexts/useUser';
import { Navigate } from 'react-router-dom';

const Protected = ({children}:{children:React.ReactNode}) => {
    const {user,loading} = useUser()

    if(loading){
        return <div>Loading...</div>
    }

    if(!user){
        return <Navigate to="/signup" />
    }

  return children
}

export default Protected