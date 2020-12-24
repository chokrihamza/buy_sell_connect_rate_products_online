import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Container, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import "./PostAnnounce.css";
import { postAnnounce } from "../../js/actions/actionAnnouce";
const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  button: {
    margin: theme.spacing(1),
  },
}));
const PostAnnounces = () => {
  const classes = useStyles();
  const [productImages, setProductImages] = useState();
  const [productName, setProductName] = useState();
  const [productCategory, setProductCategory] = useState();
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [Description, setDescription] = useState();

  
  const data = new FormData();
data.append("imagesProduct",productImages)

  data.append("productName", productName);
  data.append("productCategory", productCategory);
  data.append("quantity", quantity);
  data.append("price", price);
  data.append("Description", Description);

 
  const dispatch = useDispatch();
  console.log(productImages)

  return (
    <div className="design-PostAnnounce">
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
          onChange={(event) => {
            const file = event.target.files[1];
           
            setProductImages(file)
          }}
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
          />
          <Container>
            <Row>
              <Col>
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
            <Form.Label>Product Category</Form.Label>
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
        style={{ marginLeft: "43.5%" }}
        onClick={() => dispatch(postAnnounce(data))}
      >
        Upload
      </Button>
    </div>
  );
};

export default PostAnnounces;
