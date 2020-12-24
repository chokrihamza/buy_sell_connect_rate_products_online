import React,{useEffect} from 'react'
import { getAnnounceById } from '../../js/actions/actionAnnouce';
import { useDispatch, useSelector } from "react-redux";
import "./AnnounceDetails.css";
import FlashMessage from "react-flash-message";
import Alert from '@material-ui/lab/Alert';
import CarroucelAnnounce from './CarroucelAnnounce';
import {Table} from 'react-bootstrap'
const AnnounceDetails = ({id}) => {
  const announceid = useSelector(state => state.announceReducer.announceid);
  const loadAnnounceid = useSelector(state => state.announceReducer.loadAnnounceid);
  
  const dispatch = useDispatch()
  useEffect(() => {
        dispatch(getAnnounceById(id))
        
      }, [id])
  
const { productCategory,
    Description,
    productName,
    quantity,
    price,
    productImages,
    updatedAt,
    user,
    userImage,
   
  } = announceid
  


  return (
    (loadAnnounceid)?(<FlashMessage duration={1000}>
      <Alert variant="outlined" severity="success"
        style={{
          position: "fixed",
          bottom: "2%",
          right: "0%",
        }}>
        Please Wait
       </Alert>
      </FlashMessage>):
      (<div className="Container">
        <CarroucelAnnounce productImages={productImages} />
        <Table striped bordered hover>
          <thead>
          <tr style={{
              backgroundColor: "Navy",
              textAlign: "center",
              color:"white"
            }}>
      
      <td colSpan="3">Product Details</td>
      
    </tr>
    <tr>
      <th>N°</th>
      <th>Item</th>
              <th
              style={{
                textAlign: "center"
                
              }}
              >Datum</th>
      
    </tr>
  </thead>
  <tbody>
      <tr>
      <td>1</td>
      <td>Category</td>
              <td
              style={{
                textAlign: "center"
                
              }}
              >{productCategory}</td>
     
      
    </tr>
    <tr>
    <td>2</td>
      <td>Name</td>
              <td
                style={{
                  textAlign: "center"
                  
                }}
              >{productName}</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Quantity</td>
              <td
              style={{
                textAlign: "center"
                
              }}
              >{quantity}</td>
            </tr>
            <tr>
             <td>4</td>
              <td>Price</td>
              <td
              style={{
                textAlign: "center"
                
              }}
              >{price}</td>
            </tr>
            <tr>
            <td>5</td>
      <td>Description</td>
              <td
              style={{
                textAlign: "center"
                
              }}
              >{Description}</td>
            </tr>
            
            <tr style={{
              backgroundColor: "Navy",
              textAlign: "center",
              color:"white"
            }}>
      
      <td colSpan="3">Seller Details</td>
      
    </tr>
      <tr>
      <td>6</td>
      <td>SellerName</td>
              <td
              style={{
                textAlign: "center"
                
              }}
              >{user&&user.name}</td>
      </tr>
      <tr>
      <td>7</td>
      <td>Email</td>
              <td
              style={{
                textAlign: "center"
                
              }}
              >{user&&user.email}</td>
      </tr>
      <tr>
      <td>8</td>
      <td>Phone</td>
              <td
              style={{
                textAlign: "center"
                
              }}
              >{user&&user.phoneNumber}</td>
      </tr>
      <tr>
      <td>9</td>
      <td>CreatedAt</td>
              <td
              style={{
                textAlign: "center"
                
              }}
              >{updatedAt}</td>
      </tr>
           
  </tbody>
</Table>
                  
            </div>
   
    
    
      )
  )
}

export default AnnounceDetails

