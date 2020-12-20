import {
  REGISTER_FAIL,
  REGISTER_USER,
  REGISTER_SUCCESS,
  LOGOUT_USER,
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  EMPTY_USER
} from "../constants/action-types.js";
import {
  LOGIN_FAIL,
  LOGIN_USER,
  LOGIN_SUCCESS,
} from "../constants/action-types.js";

const initialState = {
  loadUser: false,
  user: null,
  errors: null,
  
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_USER:
      return {
        ...state,
        loadUser: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loadUser: false,
        user: payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        loadUser: false,
        errors: payload,
      };

    case LOGIN_USER:
      return {
        ...state,
        loadUser: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loadUser: false,
        token: payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loadUser: false,
        errors: payload,
      };

    case LOGOUT_USER:
      localStorage.removeItem("token");
      return { user: null, loadUser: false, errors: null };
    case GET_USER:
      return { ...state, loadUser: true };
    case GET_USER_SUCCESS:
      return { ...state, loadUser: false, user: payload };
    case GET_USER_FAIL:
      return { ...state, loadUser: false, errors: payload };
    case EMPTY_USER:
      return {
        ...state, loadUser: false,
        user: null,
        errors: null,
      }
    default:
      return state;
  }
};

export default userReducer;
