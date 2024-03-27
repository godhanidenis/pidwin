import {
  USER_PROFILE_ERROR,
  USER_PROFILE_START,
  USER_PROFILE_SUCCESS,
} from "../actions/userProfile";

const initialState = {
  data: null,
  error: null,
  loading: false,
};

const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE_START:
      return { ...state, loading: true };
    case USER_PROFILE_SUCCESS:
      return { ...state, data: action?.data, error: null, loading: false };
    case USER_PROFILE_ERROR:
      return { ...state, error: action?.data, data: null, loading: false };

    default:
      return state;
  }
};
export default userProfileReducer;
