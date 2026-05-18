import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:5000",
    withCredentials:true
})

const updateAssistant = async (formData:FormData)=>{
    try{
        let formData= new FormData()
        formData.append("assistantName", assistantName)
        if(backendImage){
            formData.append("assistantImage", backendImage)
        }else{
            formData.append("imageUrl", selectedImage)
        }
        const response = await api.post("/api/assistant/update", formData, {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })

        return response.data
    }catch(err){
        console.log(err)
    }
}

export {updateAssistant}