import bcrypt from 'bcryptjs';
import userModel from '../models/user.model.js';
import generateToken from '../config/token.js';

const signUp = async (req, res) => {

    try{
        const {name,email,password} = req.body

        const userExist = await userModel.findOne({email})

        if(userExist){
            return res.json({
                "message":"User already exist"
            })
        }

        if(password.length<6){
            return res.json({
                "message":"Password must be greater than 6 characters"
            })
        }

        const hashed = await bcrypt.hash(password,10)

        const user = await userModel.create({
            email,
            password:hashed,
            name
        })

        const token= await generateToken(user._id)

        res.cookie("token",token,{
            httpOnly:true,
            maxAge:24*60*60*1000,
            sameSite :"strict",
            secure:false
        })

        res.status(201).json({
            "message":"User created successfully",
            "user":user
        })

    }catch(err){
        console.log(err)
    }
}


const login = async (req, res) => {

    try{
        const {email,password} = req.body

        const user = await userModel.findOne({email})

        if(!user){
            return res.json({
                "message":"User does not exist"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({
                "message":"Incorrect password"
            })
        }

        const token= await generateToken(user._id)

        res.cookie("token",token,{
            httpOnly:true,
            maxAge:24*60*60*1000,
            sameSite :"strict",
            secure:false
        })

        res.status(200).json({
            "message":"User logged in successfully",
            "user":user
        })

    }catch(err){
        console.log(err)
    }
}


const logout = async (req,res)=>{
    try{
        res.clearCookie("token")

        res.status(200).json({
            "message":"User logged out successfully"
        })

    }catch(err){
        console.log(err)
    }
}

const getMe = async (req,res)=>{

    const id = req.user.userId
    try{
        const user = await userModel.findById(id).select("-password")

        if(!user){
        
        return res.status(404).json({
            success:false,
            message:"User not found",
    })
    }
        res.status(200).json({ user })
    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Internal server error" })
    }
}

export {signUp, login, logout, getMe}