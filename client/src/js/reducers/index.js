import { combineReducers } from "redux";
import userReducer from "./userReducer";
import profileReducer from "./profileReducer";

import announceReducer from "./announceReducer";
export const rootReducers =combineReducers({
  userReducer,
  announceReducer,
  profileReducer
  
});
