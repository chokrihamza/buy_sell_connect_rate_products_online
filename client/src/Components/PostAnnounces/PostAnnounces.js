import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Container, Col, Row } from "react-bootstrap";
import { useDispatch,useSelector } from "react-redux";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import "./PostAnnounce.css";
import { postAnnounce } from "../../js/actions/actionAnnouce";
import { useHistory } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import FlashMessage from "react-flash-message";
const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  button: {
    margin: theme.spacing(1),
  },
}));
const PostAnnounces = () => {
  const history=useHistory()
  const dispatch = useDispatch();
  const classes = useStyles();
  const [productImages, setProductImages] = useState();
  const [productName, setProductName] = useState();
  const [productCategory, setProductCategory] = useState();
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [Description, setDescription] = useState();
 
  const handleSubmit = () => {
    const data = new FormData();
   
    if (productImages) {
      for (const i of Object.keys(productImages)) {
        data.append("imagesProduct", productImages[i]);
      }
    }
    
    data.append("productName", productName);
    data.append("productCategory", productCategory);
    data.append("quantity", quantity);
    data.append("price", price);
    data.append("Description", Description);

    dispatch(postAnnounce(data));
  };
  const postErrorsMsg = useSelector(state => state.announceReducer.postErrors)
  const loadPostAnnounce = useSelector(state => state.announceReducer.loadPostAnnounce)
  console.log(loadPostAnnounce)
  return (
   
    <div className="design-PostAnnounce">
      {loadPostAnnounce ?  <Alert variant="filled" severity="info" >
               please wait...
             </Alert>
        : postErrorsMsg && <FlashMessage duration={1000}
            
            >
              <Alert variant="filled" severity="warning" >
               {postErrorsMsg.msg}
             </Alert>
              </FlashMessage>}
      <div
        className="file-upload"
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <input
          accept="image/*"
          className={classes.input}
          id="icon-button-file"
          type="file"
          multiple
          onChange={(e) => setProductImages(e.target.files)}
        />
        <label htmlFor="icon-button-file">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <i class="fas fa-arrow-circle-up">Upload Images</i>
          </IconButton>
        </label>
      </div>
      <div className="design-bottomPost">
        <div>
          Product Name:
          <Form.Control
            type="text"
            placeholder="Product Name..."
            onChange={(e) => {
              setProductName(e.target.value);
            }}
            className="mb-4"
          />
          <Container>
            <Row>
              <Col className="mb-4">
                Quantity:
                <Form.Control
                  type="text"
                  placeholder="Quantity..."
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                />
              </Col>
              <Col>
                Price:
                <Form.Control
                  type="text"
                  placeholder="Price..."
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </Col>
            </Row>
          </Container>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Product Category:</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => {
                setProductCategory(e.target.value);
              }}
            >
              <option>viandes – poissons – œufs</option>
              <option>produits laitiers</option>
              <option>matières grasses</option>
              <option>légumes et fruits</option>
              <option> céréales et dérivés – légumineuses</option>
              <option>sucres et produits sucrés</option>
              <option>boissons</option>
              <option>autres...</option>
            </Form.Control>
          </Form.Group>
        </div>
        <div className="design-description">
          <p>Description:</p>
          <textarea
            id="story"
            name="story"
            rows="6"
            className="design-textarea"
            placeholder="Description..."
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
        type="submit"
        style={{ marginLeft: "43.5%" }}
          onClick={() => {
            handleSubmit();
            //history.push("/Dashboard");
            }}
      >
        Upload
      </Button>
      </div>
  
  );
};

export default PostAnnounces;
