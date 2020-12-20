import React from 'react'
import GetProfile from '../Components/Profile/GetProfile'
import NavebarePage from '../Components/Layout/Navbar'
import { Redirect } from "react-router-dom";
const Profile = () => {
      if (localStorage.getItem("token")) {
          return  (<div>
            <NavebarePage/>
            <GetProfile />
            </div>)
      }
            
     return  <Redirect to="/Dashboard" />
                       
}
export default Profile
