import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { EmptyUser } from "../../js/actions/actionUser";
import { EmptyProfile } from "../../js/actions/actionprofile";
import "./GetProfile.css";
import { Redirect, useHistory } from "react-router-dom";
import { Spinner } from "reactstrap";
import { deleteProfile } from "../../js/actions/actionprofile";
import { Button, Modal } from "react-bootstrap";

function GetProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profileReducer.profile.user);
  const profile = useSelector((state) => state.profileReducer.profile);
  const loadProfile = useSelector((state) => state.profileReducer.loadProfile);
  const token = localStorage.getItem("token");
  const history = useHistory();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (!token) {
    return <Redirect to="/" />;
  } else if (loadProfile) {
    return (
      <Spinner
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
        }}
        color="primary"
      />
    );
  } else {
    return (
      <div className="card-item">
        <div className="card-header">
          <div className="card-header__bg"></div>
          <img src={profile.image} className="card-header__img" />
          <div className="card-process">
            <button href="#" className="process__item">
              <div className="process-icon follow">
                <i className="far fa-edit"></i>
              </div>
              <span className="process-txt">Edit</span>
            </button>
            <button
              onClick={() => {
                handleShow();
              }}
              className="process__item"
            >
              <div className="process-icon message">
                <i className="fas fa-trash-alt"></i>
              </div>
              <span className="process-txt">Delete</span>
            </button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Warning</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete your account
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  No
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    handleClose();
                    dispatch(deleteProfile());
                    history.push("/");
                    dispatch(EmptyProfile());
                    dispatch(EmptyUser());
                    localStorage.clear();
                  }}
                >
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="card-header__text">
            <span className="card-header__name">{user.name}</span>
            <span className="card-header__job">Phone:{user.phoneNumber}</span>
            <span className="card-header__job">email:{user.email}</span>
          </div>
        </div>
        <ul className="card-detail">
          <li className="card-detail__li">
            <p className="card-detail__txt">Location:</p>
            <p className="card-detail__str">{profile.location}</p>
          </li>
          <li className="card-detail__li">
            <p className="card-detail__txt">adresse:</p>
            <p className="card-detail__str">{profile.adresse}</p>
          </li>
          <li className="card-detail__li">
            <p className="card-detail__txt">Farmer Domaine:</p>
            <ul>
              {profile.farmerDomaine.map((e, i) => (
                <li key={i} className="card-detail__str1" colSpan="2">
                  {e}
                </li>
              ))}
            </ul>
          </li>
        </ul>
        <i className="card-header__icon">CreatedAt:{profile.updatedAt}</i>
      </div>
    );
  }
}

export default GetProfile;
