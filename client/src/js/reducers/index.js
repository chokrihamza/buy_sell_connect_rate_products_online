import { combineReducers } from "redux";
import userReducer from "./userReducer";
import profileReducer from "./profileReducer";
import toggleReducer from "./toggleReducer";
export const rootReducers =combineReducers({
  userReducer,
  profileReducer,
  toggleReducer
});
