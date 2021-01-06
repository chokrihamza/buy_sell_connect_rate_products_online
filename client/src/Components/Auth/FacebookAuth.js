import React from 'react'
import FacebookLogin from 'react-facebook-login';
import axios from "axios";
import {  useHistory } from 'react-router-dom';
const FacebookAuth = () => {
      const history = useHistory();
    
      const responseFacebook = async (response) => {
            const { name, email } = response;
            try {
                  const result =await axios({
                    method: "POST",
                    url: "/user/authfacebook",
                    data: {name,email}
                  })
                  localStorage.setItem("token", result.data.token);
                  
                  history.push(`/Dashboard`)
                  
                } catch (error) {
                  console.log(error)
                }
                
            
      }


      return (
            <div style={{textAlign:"center"}}>
                 <FacebookLogin
               appId="904452843426252"
               autoLoad={true}
               fields="name,email,picture"
               icon="fa-facebook"
               textButton="LogIn with Facebook"
               size="small"
               
               callback={responseFacebook} />
            </div>
      )
}

export default FacebookAuth
