import { combineReducers } from "redux";
import login from "./login";
import userProfileReducer from "./userProfile";
import lastTossesReducer from "./lastTosses";
import coinTossReducer from "./coinToss";
export const LOGOUT = "LOGOUT";

const combineReducer = combineReducers({
  login,
  userProfile: userProfileReducer,
  lastTosses: lastTossesReducer,
  coinToss: coinTossReducer,
});

export default (state, action) => {
  if (action.type === LOGOUT) {
    // check for action type
    localStorage.clear();
    state = undefined;
  }
  return combineReducer(state, action);
};
