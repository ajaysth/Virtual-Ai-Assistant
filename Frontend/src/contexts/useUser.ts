import { useContext } from "react";
import { UserContext } from "./userContext";
import { login, logout, signUp, type LoginProps, type SignupProps } from "../api/auth/auth.api";


export const useUser = () =>{


    const context =useContext(UserContext)

    if(!context){
        throw new Error('useUser must be used within a UserContextProvider')
    }

    const {user,setUser,loading,setLoading,frontendImage,backendImage,selectedImage,setBackendImage,setFrontendImage,setSelectedImage,geminiResponse,listening,speaking} = context

    const handleSignUp = async ({name,email,password}:SignupProps)=>{
        try{
            setLoading(true)
            const data = await signUp({name,email,password})
            console.log(data.user)
            setUser(data.user)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }


    const handleLogin = async ({email,password}:LoginProps)=>{
        try{
            setLoading(true)
            const data = await login({email,password})
            console.log(data.user)
            setUser(data.user)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    const handleLogout = async ()=>{
        try{
            setLoading(true)
            const data = await logout()
            console.log(data.user)
            setUser(null)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }




    return {
        user,
        setUser,
        loading,
        setLoading,
        handleSignUp,
        handleLogin,
        handleLogout,
        frontendImage,
        setFrontendImage,
        backendImage,
        setBackendImage,
        selectedImage,
        setSelectedImage,
        geminiResponse,
        listening,
        speaking
    }
    

}