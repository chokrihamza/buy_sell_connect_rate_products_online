import React from "react";
import PostAnnounces from "../Components/PostAnnounces/PostAnnounces";
import NavbarPage from "../Components/Layout/Navbar";
import { Redirect } from "react-router-dom";
const CreateAnnounce = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return (
      <div>
        <NavbarPage />
        <PostAnnounces />
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};
export default CreateAnnounce;
