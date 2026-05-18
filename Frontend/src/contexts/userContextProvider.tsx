import React, { useState, useEffect } from 'react';
import {UserContext} from './userContext';
import { getMe } from '../api/auth/auth.api';

interface User{
    id: string,
    name: string,
    email: string,
    assistantName?: string,
    assistantImage?: string
}

export const  UserContextProvider = ({ children }: { children: React.ReactNode })=> {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [frontendImage, setFrontendImage] = React.useState<string | null>(null)
    const [backendImage, setBackendImage] = React.useState<string | null>(null)
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(()=>{
        const getAndSetUser = async ()=>{
            try{
                setLoading(true)
                const data = await getMe()
                if (data && data.user) {
                    setUser(data.user)
                } else {
                    setUser(null)
                }
            }catch(err){
                console.log(err)
                setUser(null)
            }finally{
                setLoading(false)
            }
        }

        getAndSetUser()
    },[])

    const value ={
        user,
        setUser,
        loading,
        setLoading,
        frontendImage,
        setFrontendImage,
        backendImage,
        setBackendImage,
        selectedImage,
        setSelectedImage
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}   