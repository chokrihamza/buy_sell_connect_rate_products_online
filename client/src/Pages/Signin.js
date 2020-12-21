import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import FlashMessage from "react-flash-message";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../js/actions/actionUser";

import { UncontrolledAlert } from 'reactstrap';
const Signin = () => {
  const dispatch = useDispatch();

  const loadUser = useSelector((state) => state.userReducer.loadUser);
  const errors = useSelector((state) => state.userReducer.errors);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const loginUser = (e) => {
    e.preventDefault();
    dispatch(
      login({
        email,
        password,
      })
    );
  };

  return (
    <div className="row mt-5">
      <div className="col-md-6 m-auto">
        <div className="card card-body">
          <h1 className="text-center mb-3">
            <i className="fas fa-sign-in-alt"></i> Login
          </h1>
         
          {localStorage.getItem("token") ? (
            <Redirect to="/Dashboard" />
          ) : loadUser ? (
            <div className="alert alert-info" role="alert">
              Please wait
            </div>
          ) : errors ? (<>
            <FlashMessage duration={1000}>
              <div className="alert alert-danger" role="alert">
                Check Again
              </div>
                </FlashMessage>
                <UncontrolledAlert color="info">
                <strong>{errors.msg}</strong>
               </UncontrolledAlert></>
          ) : null}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block"
            onClick={loginUser}
          >
            Login
          </button>

          <p className="lead mt-4">
            No Account? <a href="/register">Register</a>
            Go Home? <a href="/">Home</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
