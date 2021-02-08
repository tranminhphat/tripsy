const initialState = {
  fullName: "",
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "EDIT_USERFULLNAME": {
      const { fullName } = action.payload;
      return {
        ...state,
        fullName,
      };
    }
    default:
      return state;
  }
}
