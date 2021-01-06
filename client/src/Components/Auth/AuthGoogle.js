import React from 'react'
import { GoogleLogin } from 'react-google-login';
import axios from "axios";
import {  useHistory } from 'react-router-dom';

const AuthGoogle = () => {
// log in with google
const history = useHistory(); 
  const handleSuccessLogin =async (response) => {
 
   
    try {
      const result =await axios({
        method: "POST",
        url: "/user/authgoogle",
        data: { tokenId: response.tokenId }
      })
      localStorage.setItem("token", result.data.token);
      history.push(`/Dashboard`)
    } catch (error) {
      console.log(error)
    }
    
  
    
 }
  const handleFailureLogin = (response) => {
    console.log(response)
 }
   return (
            <div style={{textAlign:"center"}}>
                     
            <GoogleLogin
             clientId="150615739463-oerm2joto994o9g4sqeol69uj5oj5011.apps.googleusercontent.com"
             buttonText="LogIn with Google"
             onSuccess={handleSuccessLogin}
             onFailure={handleFailureLogin}
            cookiePolicy={'single_host_origin'}
            className="btn  btn-block"
            
          />
          
            </div>
      )
}

export default AuthGoogle
