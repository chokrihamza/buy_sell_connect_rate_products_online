import React from "react";
import "./Footer.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer-style">
      <Row>
        <Col>
          <img src="/logoProject.jpg" className="img-style" alt="logo" />
        </Col>
        <Col className="middle-style">
          <span>Powered by Hamza and Omar</span>
          <br />
          <p>@Copyright2021.All rights reserved. </p>
        </Col>
        <Col className="right-style">
          <span>Contact: +216********</span>
         
          <ul>
            <Link to="/">
              <li>Home</li>
            </Link>
           
            <Link to="/aboutus">
              <li>About us</li>
            </Link>
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
