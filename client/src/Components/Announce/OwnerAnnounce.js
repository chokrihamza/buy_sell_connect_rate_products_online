import React from "react";
import { useDispatch } from "react-redux";
import {  useHistory } from 'react-router-dom';
import "./OwnerAnnounce.css"
import { deleteAnnounce } from "../../js/actions/actionAnnouce";
import CardActionArea from '@material-ui/core/CardActionArea';
function OwnerAnnounce({announce}) {
    const history=useHistory()
    const dispatch = useDispatch()
  return (
    
      <div className="card-ownerAnnonce">
          <CardActionArea>
        <div className="card_image">
          <img src={announce.productImages[0]} />
          <button className="delete-btn" onClick={()=>{dispatch(deleteAnnounce(announce._id));history.push('/profile')}}><span>X</span></button>
        </div>
        <div className="card_content">
          <h2 className="card_title">{announce.productName}</h2>
          <p className="card_text">
            {announce.price}Dt/{announce.quantity}Kg
          </p>
        <button class="btn card_btn" onClick={()=>history.push(`/announce/${announce._id}`)}>Details</button>
        </div>
        </CardActionArea>
      </div>
     
  );
}

export default OwnerAnnounce;
