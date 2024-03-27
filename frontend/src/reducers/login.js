import { LOGIN } from "../actions/login";

const loginReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, authData: action?.data };

    default:
      return state;
  }
};
export default loginReducer;
