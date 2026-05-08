import {createContext} from "react";

interface User{
    id: string,
    name: string,
    email: string
}
interface UserContext{
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
    loading:boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const UserContext = createContext<UserContext | null>(null)

