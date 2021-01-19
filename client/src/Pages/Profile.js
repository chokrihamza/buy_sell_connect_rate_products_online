import React, { useEffect } from "react";
import GetProfile from "../Components/Profile/GetProfile";
import NavebarePage from "../Components/Layout/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getPrivateUserAnnounce } from "../js/actions/actionAnnouce";
import PrivateAnnounce from "../Components/Announce/PrivateAnnounce";
import "./Profile.css";
import { getUser } from "../js/actions/actionUser";
import Footer from "../Components/Layout/footer/Footer";
const Profile = () => {
  const announce = useSelector((state) => state.announceReducer.announce);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    dispatch(getPrivateUserAnnounce());
  }, []);
  if (localStorage.getItem("token")) {
    return (
      <div>
        <NavebarePage />
        <div className="paddingAnnounce">
          <GetProfile />
        </div>
        <Footer/>
      </div>
    );
  }

  return <Redirect to="/Dashboard" />;
};
export default Profile;
