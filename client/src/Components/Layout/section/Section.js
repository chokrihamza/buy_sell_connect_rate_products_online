import React from 'react'
import './Section.css'
import { Container,Row,Col } from 'react-bootstrap'
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const Section = () => {
	return (
            <div id="section">
                   <Container fluid>
                        <Row className="justify-content-md-center">
                        <Col  xs={6}>
                        <h1 data-aos="fade-up">the best <i style={{color:"#F1C111"}}>Digital Marketing App</i> in Tunisia</h1>
                        <p data-aos="fade-up">
                        whith us you can make your announce with simple click <br/>
                        gain money,<br/> contact farmers in any place at any time </p> 
                        <p data-aos="fade-up">
                        You are allowed to use this App for free just sing in and get your bascket              
                       </p>
                        <img src="office.png" style={{ width: "100%",height:"300px"}} data-aos="fade-up" />
                        </Col>
                  </Row>     
                 </Container> 
	<h1 id="desc" data-aos="fade-left" style={{textAlign:"center"}}>Make your life easier</h1>
		
      <OwlCarousel className="owl-theme" loop margin={10} nav>
        <div className="item" >
          <img src="tomate.jpg" style={{ width: "100%",height:"300px"}} />
        </div>
        <div className="item">
          <img src="limon.jpg" style={{ width: "100%",height:"300px"}} />
        </div>
        <div className="item">
          <img src="fraise.jpg" style={{ width: "100%",height:"300px"}} />
        </div>
        <div className="item">
          <img src="pistache.jpg" style={{ width: "100%",height:"300px"}} />
        </div>
        <div className="item">
          <img src="orange.jpg" style={{ width: "100%",height:"300px"}} />
        </div>
      <div className="item">
          <img src="kiwii.jpg" style={{ width: "100%",height:"300px"}} />
      </div>
                  </OwlCarousel>

                      
	</div>
			
	
     
      )
}

export default Section
