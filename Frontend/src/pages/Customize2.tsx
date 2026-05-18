import React from 'react'
import { useUser } from '../contexts/useUser';

const Customize2 = () => {
    

    const [assistantName, setAssistantName] = React.useState("")

    const {frontendImage,backendImage, selectedImage} = useUser()


    return (
        <div className="h-screen w-full p-5 gap-5 bg-gradient-to-t from-[black] to-[#010151] flex justify-center items-center flex-col">
            <h1 className="text-3xl font-orbitron mb-6">Select your Assistant Name</h1> 
            <input type="text" value={assistantName} onChange={(e)=>{setAssistantName(e.target.value)}} placeholder="eg: cybertron" className="w-full max-w-[600px] input-cyber pl-12 font-rajdhani text-lg" />


            {assistantName && <button className=" neon-button py-2 px-4 flex items-center justify-center group active:scale-95 transition-all duration-200 cursor-pointer">
                    <span>Create Assistant</span>
                </button>}
        </div>
    )
}

export default Customize2