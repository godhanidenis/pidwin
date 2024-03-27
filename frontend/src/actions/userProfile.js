import * as api from "../api";
import * as messages from "../messages";

export const USER_PROFILE_START = "USER_PROFILE_START";
export const USER_PROFILE_SUCCESS = "USER_PROFILE_SUCCESS";
export const USER_PROFILE_ERROR = "USER_PROFILE_ERROR";

export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_PROFILE_START,
    });
    const { data } = await api.userProfile();
    dispatch({
      type: USER_PROFILE_SUCCESS,
      data,
    });
  } catch (error) {
    if (error?.response) {
      dispatch({
        type: USER_PROFILE_ERROR,
        data: error?.response?.data?.message,
      });
      messages.error(error?.response?.data?.message);
    } else if (error?.request) {
      dispatch({
        type: USER_PROFILE_ERROR,
        data: error?.request?.data?.message,
      });
      messages.error("Something went wrong!");
    } else if (error.message) {
      dispatch({ type: USER_PROFILE_ERROR, data: error.message });
      messages.error("Something went wrong!");
    }
  }
};
