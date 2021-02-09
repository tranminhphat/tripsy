import User from "../@types/users/User";

export const setUser = (user: User) => ({
  type: "SET_USER",
  payload: {
    user,
  },
});

export const eraseUser = () => ({
  type: "ERASE_USER",
});
