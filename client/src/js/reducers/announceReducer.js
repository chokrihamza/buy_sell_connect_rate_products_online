import {
  GET_PUBLIC_ANNOUCE,
  GET_PUBLIC_ANNOUCE_FAIL,
  GET_PUBLIC_ANNOUCE_SUCCESS,
  GET_PRIVATE_ANNOUCE,
  GET_PRIVATE_ANNOUCE_FAIL,
  GET_PRIVATE_ANNOUCE_SUCCESS,
} from "../constants/actionTypesAnnouce";

// initialState
const initialState = {
  loadAnnounce: false,
  announce: null,
  errors: null,
};

// reducer
const announceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PUBLIC_ANNOUCE:
      return { ...state, loadAnnounce: true };
    case GET_PUBLIC_ANNOUCE_SUCCESS:
      return { ...state, announce: payload, loadAnnounce: false };
    case GET_PUBLIC_ANNOUCE_FAIL:
      return { ...state, errors: payload, loadAnnounce: false };
    case GET_PRIVATE_ANNOUCE:
      return { ...state, loadAnnounce: true };
    case GET_PRIVATE_ANNOUCE_SUCCESS:
      return { ...state, announce: payload, loadAnnounce: false };
    case GET_PRIVATE_ANNOUCE_FAIL:
      return { ...state, errors: payload, loadAnnounce: false };
    default:
      return state;
  }
};
export default announceReducer;
