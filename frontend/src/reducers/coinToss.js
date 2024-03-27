import {
  COIN_TOSS_ERROR,
  COIN_TOSS_START,
  COIN_TOSS_SUCCESS,
} from "../actions/coinToss";

const initialState = {
  data: null,
  error: null,
  loading: false,
};

const coinTossReducer = (state = initialState, action) => {
  switch (action.type) {
    case COIN_TOSS_START:
      return { ...state, loading: true };
    case COIN_TOSS_SUCCESS:
      return { ...state, data: action?.data, error: null, loading: false };
    case COIN_TOSS_ERROR:
      return { ...state, error: action?.data, data: null, loading: false };
    default:
      return state;
  }
};
export default coinTossReducer;
