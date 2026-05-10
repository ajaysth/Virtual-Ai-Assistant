import { useState } from 'react';
import {UserContext} from './userContext';

interface User{
    id: string,
    name: string,
    email: string
}

export const  UserContextProvider = ({ children }: { children: React.ReactNode })=> {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);


    const value ={
        user,
        setUser,
        loading,
        setLoading
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}   