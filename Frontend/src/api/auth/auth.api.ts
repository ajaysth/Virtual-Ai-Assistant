import axios from "axios";

export interface SignupProps{
    name:string,
    email:string,
    password:string
}
export interface LoginProps{
    email:string,
    password:string
}


const api = axios.create({
    baseURL:"http://localhost:5000",
    withCredentials:true
})

const signUp = async ({name,email,password}:SignupProps)=>{
    try{
        const response = await api.post("/api/auth/signup",{
            name,
            email,
            password
        })

        return response.data
    }catch(err){
        console.log(err)
    }
}

const login = async ({email,password}:LoginProps)=>{
    try{
        const response = await api.post("/api/auth/login",{
            email,
            password
        })

        return response.data
    }catch(err){
        console.log(err)
    }
}

const logout = async ()=>{
    try{
        const response = await api.post("/api/auth/logout")

        return response.data
    }catch(err){
        console.log(err)
    }
}

const getMe = async ()=>{
    try{
        const response = await api.get("/api/auth/getme")

        return response.data
    }catch(err){
        console.log(err)
    }
}

export {signUp, login, logout, getMe}