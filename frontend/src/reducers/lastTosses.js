import {
  LAST_TOSSES_START,
  LAST_TOSSES_ERROR,
  LAST_TOSSES_SUCCESS,
} from "../actions/lastTosses";

const initialState = {
  data: null,
  error: null,
  loading: false,
};

const lastTossesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LAST_TOSSES_START:
      return { ...state, loading: true };
    case LAST_TOSSES_SUCCESS:
      return { ...state, data: action?.data, error: null, loading: false };
    case LAST_TOSSES_ERROR:
      return { ...state, error: action?.data, data: null, loading: false };
    default:
      return state;
  }
};
export default lastTossesReducer;
