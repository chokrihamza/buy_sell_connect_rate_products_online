import axios from "axios";
import {
  GET_PUBLIC_ANNOUCE,
  GET_PUBLIC_ANNOUCE_FAIL,
  GET_PUBLIC_ANNOUCE_SUCCESS,
  GET_PRIVATE_ANNOUCE,
  GET_PRIVATE_ANNOUCE_FAIL,
  GET_PRIVATE_ANNOUCE_SUCCESS,
  GET_PRIVATEUSER_ANNOUCE,
  GET_PRIVATEUSER_ANNOUCE_SUCCESS,
  GET_PRIVATEUSER_ANNOUCE_FAIL,
  GET_ANNOUCE_BYID,
  GET_ANNOUCE_BYID_SUCCESS,
  GET_ANNOUCE_BYID_FAIL


} from "../constants/actionTypesAnnouce";

// get all of public announce
export const getPublicAnnounce = () => async (dispatsh) => {
  dispatsh({ type: GET_PUBLIC_ANNOUCE });
  try {
    const result = await axios.get("/announce/pubannounce");
    dispatsh({ type: GET_PUBLIC_ANNOUCE_SUCCESS, payload: result.data });
  } catch (error) {
    dispatsh({ type: GET_PUBLIC_ANNOUCE_FAIL, payload: error.response.data });
  }
};
// get all of private announce
export const getPrivateAnnounce = () => async (dispatsh) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatsh({ type: GET_PRIVATE_ANNOUCE });
  try {
    const result = await axios.get("/announce",config);
    dispatsh({ type: GET_PRIVATE_ANNOUCE_SUCCESS, payload: result.data });
  } catch (error) {
    dispatsh({ type: GET_PRIVATE_ANNOUCE_FAIL, payload: error.response.data });
  }
};

// get all user of private announce
export const getPrivateUserAnnounce = () => async (dispatsh) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatsh({ type: GET_PRIVATEUSER_ANNOUCE });
  try {
    const result = await axios.get("/announce/owner",config);
    dispatsh({ type:GET_PRIVATEUSER_ANNOUCE_SUCCESS , payload: result.data });
  } catch (error) {
    dispatsh({ type: GET_PRIVATEUSER_ANNOUCE_FAIL, payload: error.response.data });
  }
};

//get Announce by ID 
export const getAnnounceById = (id) => async (dispatsh) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatsh({ type: GET_ANNOUCE_BYID });
  try {
    const result = await axios.get(`/announce/${id}`,config);
    dispatsh({ type:GET_ANNOUCE_BYID_SUCCESS , payload: result.data });
  } catch (error) {
    dispatsh({ type: GET_ANNOUCE_BYID_FAIL, payload: error.response.data });
  }
};