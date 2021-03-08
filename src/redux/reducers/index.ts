import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import experience from "./experience";

export default combineReducers({ auth, alert, experience });
