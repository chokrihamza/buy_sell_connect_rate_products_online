import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUser } from "../js/actions/actionUser";
import { useEffect } from "react";
import PostProfile from "../Components/Profile/PostProfile";
import { getOwnerProfile, } from "../js/actions/actionprofile";
import { Spinner } from 'reactstrap';
import FlashMessage from "react-flash-message";
import "./Dashboard.css"
import NavbarPage from "../Components/Layout/Navbar";

const Dashboard = () => {
  const profile = useSelector((state) => state.profileReducer.profile);
  const user = useSelector((state) => state.userReducer.user);
  const loadUser = useSelector((state) => state.userReducer.loadUser);
 const loadProfile = useSelector((state) => state.profileReducer.loadProfile);
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(getOwnerProfile());
    dispatch(getUser());
  }, []);
  if ( loadProfile &&loadUser) {
    return (
      <>
        <NavbarPage />
        <Spinner style={{
        position: 'absolute', left: '50%', top: '50%',
        
        }}
          color="primary" />
      </>
    );
  } else if (!user) {
    return <Redirect to="/login" />;
  } else {
    return (
      <div>
        <NavbarPage />
        <FlashMessage duration={2000}>
          <div className="alert alert-info" role="alert">
            Welcome {user.name} we are happy to see you
          </div>
        </FlashMessage>
        {!profile ? <div className="design-postProfile"><PostProfile/></div>: <h1>announce</h1>}
      </div>
    );
  }
};

export default Dashboard;
