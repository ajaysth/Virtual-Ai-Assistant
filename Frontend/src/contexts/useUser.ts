import { useContext, useEffect } from "react";
import { UserContext } from "./userContext";
import { getMe, login, logout, signUp, type LoginProps, type SignupProps } from "../api/auth/auth.api";


export const useUser = () =>{


    const context =useContext(UserContext)

    if(!context){
        throw new Error('useUser must be used within a UserContextProvider')
    }

    const {user,setUser,loading,setLoading} = context

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

    return {
        user,
        setUser,
        loading,
        setLoading,
        handleSignUp,
        handleLogin,
        handleLogout
    }
    

}