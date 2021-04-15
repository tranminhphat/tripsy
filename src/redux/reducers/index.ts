import { combineReducers } from "redux";
import auth from "./auth";
import experience from "./experience";

export default combineReducers({ auth, experience });
