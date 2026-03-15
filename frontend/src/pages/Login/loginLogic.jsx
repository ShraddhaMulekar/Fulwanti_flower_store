import React from 'react'
import useFetch from "../../hook/useFetch"
import { useDispatch } from 'react-redux'
import loginSuccess from "../../redux/authSlice"

const loginLogic = () => {
    const {request}=useFetch()
    const dispatch = useDispatch()

    const loginUser = async(values)=>{
        const data = await("/auth/login", "POST", values)

        if(data.token){
            dispatch(loginSuccess(data))
        }
    }
  return ({loginUser})
}

export default loginLogic
