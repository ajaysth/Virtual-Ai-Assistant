import React, { useState } from 'react';
import {UserContext} from './userContext';

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