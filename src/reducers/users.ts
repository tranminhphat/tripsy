const initialState = {
  fullName: "",
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USERFULLNAME": {
      const { fullName } = action.payload;
      console.log(fullName);
      return {
        ...state,
        fullName,
      };
    }
    default:
      return state;
  }
}
