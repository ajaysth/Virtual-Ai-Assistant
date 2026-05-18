import {createContext} from "react";

interface User{
    id: string,
    name: string,
    email: string,
    assistantName?: string,
    assistantImage?: string
}
interface UserContext{
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
    loading:boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    frontendImage: string | null,
    setFrontendImage: React.Dispatch<React.SetStateAction<string | null>>,
    backendImage: string | null,
    setBackendImage: React.Dispatch<React.SetStateAction<string | null>>,
    selectedImage: string | null,
    setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>
}

export const UserContext = createContext<UserContext | null>(null)

