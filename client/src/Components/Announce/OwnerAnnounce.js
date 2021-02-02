import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./OwnerAnnounce.css";
import { deleteAnnounce } from "../../js/actions/actionAnnouce";
import CardActionArea from "@material-ui/core/CardActionArea";
import { Button, Modal, Form } from "react-bootstrap";
function OwnerAnnounce({ announce }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <div className="card-ownerAnnonce">
      <CardActionArea>
        <div className="card_image">
          <img src={announce.productImages[0]} />
          <button className="delete-btn" onClick={() => handleShow()}>
            <span>X</span>
          </button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete your announce
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                No
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleClose();
                  dispatch(deleteAnnounce(announce._id));
                  history.push("/profile");
                }}
              >
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className="card_content">
          <h2 className="card_title">{announce.productName}</h2>
          <p className="card_text">
            {announce.price}Dt/{announce.quantity}Kg
          </p>
          <button
            class="btn card_btn"
            onClick={() => history.push(`/announce/${announce._id}`)}
          >
            Details
          </button>
        </div>
      </CardActionArea>
    </div>
  );
}

export default OwnerAnnounce;
