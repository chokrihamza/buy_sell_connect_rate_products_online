import React from 'react';
import NavbarPage from "../Components/Layout/Navbar"
import PostAnnounces from '../Components/PostAnnounce/PostAnnounces';
import './PostAnnounce.css';
const PostAnnounce = () => {
      return (
            <div className="postAnnounce">
            <NavbarPage />
            <PostAnnounces/>
            
            </div>
      )
}

export default PostAnnounce
