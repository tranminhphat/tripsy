import { SET_USER_ID, DELETE_USER_ID } from "./userActionTypes";

export const setUserId = (id: string | null) => ({
  type: SET_USER_ID,
  payload: {
    userId: id,
  },
});

export const deleteUserId = () => ({
  type: DELETE_USER_ID,
});
