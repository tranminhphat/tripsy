import IAction from "interfaces/action/action.interface";

const initialState = {};

export default function userReducer(state = initialState, action: IAction) {
  switch (action.type) {
    default:
      return state;
  }
}
