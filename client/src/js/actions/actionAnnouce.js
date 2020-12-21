import axios from "axios";
import {
  GET_PUBLIC_ANNOUCE,
  GET_PUBLIC_ANNOUCE_FAIL,
  GET_PUBLIC_ANNOUCE_SUCCESS,
  GET_PRIVATE_ANNOUCE,
  GET_PRIVATE_ANNOUCE_FAIL,
  GET_PRIVATE_ANNOUCE_SUCCESS,
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
