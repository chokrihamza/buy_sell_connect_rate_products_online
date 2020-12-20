import {
  REGISTER_USER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_USER,
  GET_USER,
  GET_USER_FAIL,
  GET_USER_SUCCESS,
  EMPTY_USER
} from "../constants/action-types";
import axios from "axios";
export const register = (newuser) => async (dispatsh) => {
  dispatsh({ type: REGISTER_USER });
  try {
    const addRes = await axios.post("/user/register", newuser);
    dispatsh({
      type: REGISTER_SUCCESS,
      payload: addRes.data,
    });
  } catch (error) {
    dispatsh({
      type: REGISTER_FAIL,
      payload: error.response.data,
    });
  }
};

export const login = (credential) => async (dispatsh) => {
  dispatsh({ type: LOGIN_USER });
  try {
    const loginRes = await axios.post("/user/login", credential);
    localStorage.setItem("token", loginRes.data.token);
    dispatsh({
      type: LOGIN_SUCCESS,
      payload: loginRes.data,
    });
  } catch (error) {
    dispatsh({
      type: LOGIN_FAIL,
      payload: error.response.data,
    });
  }
};
export const getUser = () => async (dispatsh) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatsh({ type: GET_USER });
  try {
    const result = await axios.get("/user/current", config);

    dispatsh({
      type: GET_USER_SUCCESS,
      payload: result.data,
    });
  } catch (error) {
    dispatsh({
      type: GET_USER_FAIL,
      payload: error.response.data,
    });
  }
};

export const logout = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const EmptyUser = () => {
  return { type: EMPTY_USER }

}