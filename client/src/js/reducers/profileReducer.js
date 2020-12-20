import {
  POST_PROFILE,
  POST_PROFILE_FAIL,
  POST_PROFILE_SUCCESS,
  GET_OWNER_PROFILE,
  GET_OWNER_PROFILE_SUCCESS,
  GET_OWNER_PROFILE_FAIL,
  EMPTY_PROFILE,
 
  DELETE_PROFILE_SUCCESS,
 
  DELETE_PROFILE_FAIL,
  EDIT_PROFILE,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
} from "../constants/action-types";

// initialState
const initialState = {
  loadProfile: false,
  errors: null,
  profile: null,
  
};

const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case POST_PROFILE:
      return { ...state, loadProfile: true };
    case POST_PROFILE_SUCCESS:
      return { ...state, loadProfile: false, profile: payload };
    case POST_PROFILE_FAIL:
      return { ...state, loadProfile: false, errors: payload };
    case GET_OWNER_PROFILE:
      return {
        ...state,
        loadProfile: true,
      };
    case GET_OWNER_PROFILE_SUCCESS:
      return {
        ...state,
        loadProfile: false,
        profile: payload,
      };
    case GET_OWNER_PROFILE_FAIL:
      return {
        ...state,
        loadProfile: false,
        errors: payload,
      };
    
    case DELETE_PROFILE_SUCCESS:
      localStorage.removeItem("token");
      return { ...state, loadProfile: false };
    case DELETE_PROFILE_FAIL:
      return { ...state, loadProfile: false, errors: payload };
    case EMPTY_PROFILE:
      return {
        ...state,
        loadProfile: false,
        errors: null,
        profile: null,
      };
      case EDIT_PROFILE:
      return { ...state, loadProfile: true };
    case EDIT_PROFILE_SUCCESS:
      return { ...state, loadProfile: false, profile: payload };
    case EDIT_PROFILE_FAIL:
      return { ...state, loadProfile: false, errors: payload };

    default:
      return state;
  }
};

export default profileReducer;
