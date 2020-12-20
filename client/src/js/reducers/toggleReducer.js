import { TOGGLE_FALSE, TOGGLE_TRUE } from "../constants/toggle-type";

// initialestate
const initialState = {
  toggleLogin: false,
};
const toggleReducer = (state = initialState, { type }) => {
  switch (type) {
    case TOGGLE_TRUE:
      return {...state,toggleLogin:true};
    case TOGGLE_FALSE:
      return {...state,toggleLogin:false};

    default:
      return state;
  }
};
export default toggleReducer;
