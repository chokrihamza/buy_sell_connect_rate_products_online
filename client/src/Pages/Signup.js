import React from "react";
import { useState } from "react";
import { UncontrolledAlert } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import { register } from "../js/actions/actionUser";
import { Redirect } from "react-router-dom";
import { toggleTrue } from "../js/actions/actionToggle";
const Signup = () => {
  const loadUser = useSelector((state) => state.userReducer.loadUser);
  const user = useSelector((state) => state.userReducer.user);
  const errors = useSelector((state) => state.userReducer.errors);

  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  const addUser = (e) => {
    e.preventDefault();
    dispatch(
      register({
        name,
        email,
        password,
        phoneNumber,
      })
    );
  };
  return (
    <div className="row mt-5 ">
      <div className="col-md-6 m-auto">
        <div className="card card-body">
          <h1 className="text-center mb-3">
            <i className="fas fa-user-plus"></i>
            Register
          </h1>
          
          {loadUser ? (
            <div className="alert alert-info" role="alert">
              Please wait
            </div>
          ) :Array.isArray(errors&&errors.errors)===true
          ? errors.errors.map((e, i) => (
            <UncontrolledAlert key={i} color="danger">
             <strong>{e.param}</strong> ${e.msg}.
            </UncontrolledAlert>
              ))
          : (user) ? (
            <Redirect to="/login" />
          ) : null}
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control-plaintext"
              name="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="name..."
            />
          </div>

          <div className="form-group">
            <label>email</label>
            <input
              type="email"
              className="form-control-plaintext border"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email..."
            />
          </div>

          <div className="form-group">
            <label>password</label>
            <input
              type="password"
              className="form-control-plaintext"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password..."
            />
          </div>

          <div className="form-group">
            <label>phoneNumber</label>
            <input
              type="text"
              className="form-control-plaintext"
              name="phoneNumber"
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="phone Number..."
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            onClick={addUser}
          >
            Register
          </button>
          <p className="lead mt-4">
            Have An Account? <a href="/login">Login</a> Go Home?{" "}
            <a href="/">Home</a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Signup;
