import {
  POST_PROFILE,
  POST_PROFILE_SUCCESS,
  POST_PROFILE_FAIL,
  GET_OWNER_PROFILE,
  GET_OWNER_PROFILE_FAIL,
  GET_OWNER_PROFILE_SUCCESS,
  EMPTY_PROFILE,
  DELETE_PROFILE_SUCCESS,
  DELETE_PROFILE_FAIL,
  EDIT_PROFILE,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
} from "../constants/action-types.js";
import axios from "axios";
import { EmptyUser } from "./actionUser.js";

// post profile
export const postProfile = (user) => async (dispatsh) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatsh({ type: POST_PROFILE });
  try {
    const result = await axios.post("/profile", user, config);

    dispatsh({ type: POST_PROFILE_SUCCESS, payload: result.data });
  } catch (error) {
    dispatsh({
      type: POST_PROFILE_FAIL,
      payload: error.response.data,
    });
  }
};
// update profile
export const editProfile = (user) => async (dispatsh) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatsh({ type: EDIT_PROFILE });
  try {
    const result = await axios.post("/profile", user, config);

    dispatsh({ type: EDIT_PROFILE_SUCCESS, payload: result.data });
  } catch (error) {
    dispatsh({
      type: EDIT_PROFILE_FAIL,
      payload: error.response.data,
    });
  }
};
// get owner profile

export const getOwnerProfile = () => async (dispatsh) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatsh({ type: GET_OWNER_PROFILE });
  try {
    const result = await axios.get("/profile/owner", config);
    dispatsh({ type: GET_OWNER_PROFILE_SUCCESS, payload: result.data });
  } catch (error) {
    dispatsh({ type: GET_OWNER_PROFILE_FAIL, payload: error.response.data });
  }
};
// delete profile
export const deleteProfile = () => async (dispatsh) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  
  try {
     const result = await axios.delete("/profile",config);
    dispatsh({ type: DELETE_PROFILE_SUCCESS ,payload:result.data.msg});
  } catch (error) {
    dispatsh({ type: DELETE_PROFILE_FAIL, payload: error.response.data });
  }
};
export const EmptyProfile = () => {
  return { type: EMPTY_PROFILE };
};
