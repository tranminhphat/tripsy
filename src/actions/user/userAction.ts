import User from "../../interfaces/users/User";
import { SET_USER, ERASE_USER } from "../../actions/user/userActionType";

export const setUser = (user: User) => ({
  type: SET_USER,
  payload: {
    user,
  },
});

export const eraseUser = () => ({
  type: ERASE_USER,
});
