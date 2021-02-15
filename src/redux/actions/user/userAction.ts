import User from "interfaces/users/user.interface";
import { SET_USER_DATA, CLEAR_USER_DATA } from "./userActionTypes";

export const setUserData = (user: User) => ({
  type: SET_USER_DATA,
  payload: {
    user,
  },
});

export const clearUserData = () => ({
  type: CLEAR_USER_DATA,
});
