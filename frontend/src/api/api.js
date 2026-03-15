export const API_URL = "http://localhost:5000"

export const fetchAPI = async(url, options={})=>{
    const token = localStorage.getItem("token")

    const res = await fetch(API_URL+url, {
        headers:{
            "Content-Type" : "application/json",
            Authorization : token ? `Bearer ${token}` : ""
        },
        ...options
    })

    return res.json()
}