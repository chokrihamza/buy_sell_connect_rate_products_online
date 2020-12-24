import React from 'react'
import { Carousel } from 'react-bootstrap'
import {useState} from 'react'
const CarroucelAnnounce = ({productImages}) => {
  
     
            const [index, setIndex] = useState(0);
    
      const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };
    
      return (
            <Carousel activeIndex={index} onSelect={handleSelect}>
                  {productImages&&(productImages).map((el,i)=>
                        (<Carousel.Item>
                        <img key={i}
                              className="d-block w-100"
                              src={`http://localhost:5000/${el}`}
                              alt="Third slide"
                        />
    
                        <Carousel.Caption>
                              <h3>User Product</h3>
                              <p>
                                    This Show you all the details of the product
                       </p>
                        </Carousel.Caption>
                  </Carousel.Item>
                  ))}
                  
            </Carousel>
      );
         
}

export default CarroucelAnnounce;
