const initialState = {
  user: {},
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER": {
      const { user } = action.payload;
      return {
        ...state,
        user: { ...user },
      };
    }
    case "ERASE_USER": {
      return {
        ...state,
        user: {},
      };
    }
    default:
      return state;
  }
}
