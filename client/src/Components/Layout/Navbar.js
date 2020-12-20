import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBContainer,
  MDBIcon,
} from "mdbreact";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { EmptyUser, logout } from "../../js/actions/actionUser";
import { EmptyProfile, getOwnerProfile } from "../../js/actions/actionprofile";

import "./Navbar.css";
const NavbarPage = () => {
  const [state, setState] = useState({
    collapseID: "",
  });
  const toggleCollapse = (collapseID) => () =>
    setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : "",
    }));
  const dispatch = useDispatch();
  const history = useHistory();
  const profile = useSelector((state) => state.profileReducer.profile);

  return (
    <MDBNavbar dark expand="md" style={{ backgroundColor: "#32325d" }}>
      <MDBNavbarBrand>
        <strong className="white-text">DASHBOARD</strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse("navbarCollapse3")} />
      <MDBCollapse id="navbarCollapse3" isOpen={state.collapseID} navbar>
        <MDBNavbarNav right>
          {!profile ?<MDBNavItem>
            <MDBNavLink className="waves-effect waves-light" to="/login">
              <i className="fas fa-sign-in-alt"></i>
              SignIn
            </MDBNavLink>
          </MDBNavItem>: <h1>autre acces</h1>}
        {!profile ?  <MDBNavItem>
            <MDBNavLink className="waves-effect waves-light" to="/register">
              <i className="fas fa-user-plus"></i>
              SignUp
            </MDBNavLink>
          </MDBNavItem>:<h1>autre access</h1> }

          {profile ? (
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" className="mr-1" />
                  Profile
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default" right>
                  <MDBDropdownItem>
                    <Link
                      to="profile"
                      onClick={() => {
                        dispatch(getOwnerProfile());
                      }}
                    >
                      {" "}
                      My Profile
                    </Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem
                    onClick={() => {
                      dispatch(logout());
                      dispatch(EmptyProfile());
                      dispatch(EmptyUser());
                      history.push("/");
                    }}
                  >
                    Log out
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          ) : null}
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
};

export default NavbarPage;
