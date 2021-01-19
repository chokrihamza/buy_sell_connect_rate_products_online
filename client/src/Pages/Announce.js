import React from 'react'
import { Redirect } from 'react-router-dom';
import AnnounceDetails from '../Components/AnnounceDetails/AnnounceDetails';
import Footer from '../Components/Layout/footer/Footer';
import NavebarePage from '../Components/Layout/Navbar';

const Announce = (props) => {
      const token = localStorage.getItem("token");
      const id = props.match.params.id
     

      if (!token) {
            return <Redirect to="/" />
      } else {
            return (
                  <div>
                        <NavebarePage />
                        <AnnounceDetails id={id}/>
                        <Footer/>
                  </div>
            )
      }
      
}

export default Announce
