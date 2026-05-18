import React from 'react'
import Card from '../components/Card';
import img1 from "../assets/img1.jpg"
import img2 from "../assets/img2.jpg"
import img3 from "../assets/img3.jpg"
import img4 from "../assets/img4.jpg"
import { BiImageAdd } from "react-icons/bi";
import { useUser } from '../contexts/useUser';
import { useNavigate } from 'react-router-dom';



const Customize = () => {

    const {frontendImage,setFrontendImage, setBackendImage, selectedImage, setSelectedImage} = useUser()
    const inputImg = React.useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    const handleImage = (e)=>{
        const file = e.target.files[0];
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }
    return (
        <div className="h-screen w-full p-5 gap-5 bg-gradient-to-t from-[black] to-[#010151] flex justify-center items-center flex-col">

            <h1 className="text-3xl font-orbitron mb-6">Select your Assistant Image</h1>
            <div className="w-[90%] max-w-[60%] flex justify-center items-center flex-wrap gap-5">
                <Card image={img1} />
                <Card image={img2} />
                <Card image={img3} />
                <Card image={img4} />

                <div onClick={()=>{
                    inputImg.current?.click()
                    setSelectedImage("input")

                }} className={`w-[150px] h-[250px] bg-[#0000ff71] border-2 border-[#0000ff18] hover:border-[blue] rounded-2xl active:scale-95 overflow-hidden hover:shadow-2xl hover:shadow-[blue] cursor-pointer transition-all duration-200  ${selectedImage === "input" ? "border-[blue] shadow-2xl shadow-[blue]" : "border-[#0000ff18]"}}`}>
                    {/* {!frontendImage && <BiImageAdd size={50} className="text-cyan-400 m-auto mt-20" />} */}
                    {frontendImage ? <img src={frontendImage} alt="Selected" className="w-full h-full object-cover" />:<BiImageAdd size={50} className="text-cyan-400 m-auto mt-20" />}
                    <input type="file" accept="image/*" hidden ref={inputImg} onChange={handleImage} />
                </div>

                {selectedImage ? <button onClick={()=>navigate("/customize2")} className=" neon-button py-2 px-4 flex items-center justify-center group active:scale-95 transition-all duration-200 cursor-pointer">
                    <span>Next</span>
                </button>: null}
            </div>
        </div>
    )
}

export default Customize