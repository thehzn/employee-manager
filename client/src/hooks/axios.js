 import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import axios from "axios";
import { useEffect } from "react";


const instance = axios.create({
        baseURL : "http://localhost:4000/api",
        withCredentials:true
    });

const useApi =()=>{
const dispatch =useDispatch();
const navigate = useNavigate();

    

    useEffect(()=>{
        const responseInterceptor = instance.interceptors.response.use(
(res)=>res,
(error)=>{
    if(error.response){
        const {status} =error.response
        if(status==401){
            
            dispatch(logout());
            navigate('/login');


        }
        if(status==403){
            navigate('/unauthorised');
        }

    
    }
    return Promise.reject(error);

}
        );
    

return()=>{
    instance.interceptors.response.eject(responseInterceptor);
}



    },[ dispatch , navigate]);
    return instance;
}

export default useApi;