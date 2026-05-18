import React from 'react'
import { useUser } from '../contexts/useUser';

interface CardProps{
    image: string
}

const Card = ({image}:CardProps) => {

      const {frontendImage,setFrontendImage,backendImage, setBackendImage, selectedImage, setSelectedImage} = useUser()

  return (
    <div onClick={()=>{
        setSelectedImage(image)
        setBackendImage(null)
        setFrontendImage(null)}
    } className={`w-[150px] h-[250px] bg-[#0000ff71] border-2 border-[#0000ff18] hover:border-[blue] rounded-2xl active:scale-95 overflow-hidden hover:shadow-2xl hover:shadow-[blue] cursor-pointer transition-all duration-200  ${selectedImage === image ? "border-[blue] shadow-2xl shadow-[blue]" : "border-[#0000ff18]"}`}>
        <img src={image} className="w-full h-full object-cover " />
    </div>
  )
}

export default Card