import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import NavebarePage from '../Components/Layout/Navbar'
const Announce = () => {
      const token = localStorage.getItem("token");
  
      if (!token) {
            return <Redirect to="/" />
      } else {
            return (
                  <div>
                        <NavebarePage />
                       ghfghfg
                  </div>
            )
      }
      
}

export default Announce
