import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { EmptyUser } from "../../js/actions/actionUser";
import { editProfile, EmptyProfile } from "../../js/actions/actionprofile";
import "./GetProfile.css";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect, useHistory } from "react-router-dom";
import { Spinner } from "reactstrap";
import { deleteProfile } from "../../js/actions/actionprofile";
import { Button, Modal, Form } from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
}));
function GetProfile() {
// state to update profile
const [location, setLocation] = useState();
const [adresse, setAdresse] = useState();
const [farmerDomaine, setFarmerDomaine] = useState();
const [image, setImage] = useState();
const data = new FormData();
  data.append("location", location);
  data.append("adresse", adresse);
  data.append("farmerDomaine", farmerDomaine);
  data.append("image", image);



  const dispatch = useDispatch();
 
  const user = useSelector((state) => state.userReducer.user);
  const profile = useSelector((state) => state.profileReducer.profile);
  const loadProfile = useSelector((state) => state.profileReducer.loadProfile);
  const token = localStorage.getItem("token");
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);
  const classes = useStyles();
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
    return (<div className="position-profil">
      <div className="card-item">
        <div className="card-header">
          <div className="card-header__bg"></div>
          <img src={profile.image} className="card-header__img" alt="user"/>
          <div className="card-process">
            {/* button of Edit profile*/}
            <button className="process__item" onClick={() => handleShowEdit()}>
              <div className="process-icon follow">
                <i className="far fa-edit"></i>
              </div>
              <span className="process-txt">Edit</span>
            </button>
            <Modal show={showEdit} onHide={handleCloseEdit} centered>
              <Modal.Header closeButton>
                <Modal.Title>Update profile</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Change your picture:
              <input
              accept="image/*"
              className={classes.input}
              id="icon-button-file"
              type="file"
             
              onChange={(event) => {
                const file = event.target.files[0];

                setImage(file);
              }}
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
              <br/>
                Choose your Country:
                <Form.Control as="select" className="mb-4"
                  onChange={(e)=>setLocation(e.target.value)}   
                >
                  <option value={"Ariana"}>Ariana</option>
                  <option value={"Béja"}>Béja</option>
                  <option value={"Bizerte"}>Bizerte</option>
                  <option value={"Gabès"}>Gabès</option>
                  <option value={"Gafsa"}>Gafsa</option>
                  <option value={"Jendouba"}>Jendouba</option>
                  <option value={"Kairouan"}>Kairouan</option>
                  <option value={"Kasserine"}>Kasserine</option>
                  <option value={"Kebili"}>Kebili</option>
                  <option value={"Manouba"}>Manouba</option>
                  <option value={"Medenine"}>Medenine</option>
                  <option value={"Monastir"}>Monastir</option>
                  <option value={"Nabeul"}>Nabeul</option>
                  <option value={"Sfax"}>Sfax</option>
                  <option value={"Sidi Bouzid"}>Sidi Bouzid</option>
                  <option value={"Siliana"}>Siliana</option>
                  <option value={"Sousse"}>Sousse</option>
                  <option value={"Tataouine"}>Tataouine</option>
                  <option value={"Tozeur"}>Tozeur</option>
                  <option value={"Tunis"}>Tunis</option>
                  <option value={"Zaghouan"}>Zaghouan</option>
                </Form.Control>
                Adresse:
                <Form.Control
                  onChange={(e)=>setAdresse(e.target.value)} 
                  type="text"
                  className="mb-4"
                  placeholder="Normal text"
                />
                Farmer Domaine :
                <Form.Control type="text" placeholder="Normal text" 
                onChange={(e)=>setFarmerDomaine(e.target.value)} 
                
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEdit}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => {
                    dispatch(editProfile(data));
                     handleCloseEdit();
                     
                }}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
            {/* button of delete profile */}
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
          {/* info of user */}
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
              {profile&&profile.farmerDomaine.map((e, i) => (
                <li key={i} className="card-detail__str1" colSpan="2">
                  {e}
                </li>
              ))}
            </ul>
          </li>
        </ul>
        <i className="card-header__icon">CreatedAt:{profile.updatedAt}</i>
      </div>
      </div>
    );
  }
}

export default GetProfile;
