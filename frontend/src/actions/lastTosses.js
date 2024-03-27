import * as api from "../api";
import * as messages from "../messages";

export const LAST_TOSSES_START = "LAST_TOSSES_START";
export const LAST_TOSSES_SUCCESS = "LAST_TOSSES_SUCCESS";
export const LAST_TOSSES_ERROR = "LAST_TOSSES_ERROR";

export const getLastTosses = () => async (dispatch) => {
  try {
    dispatch({
      type: LAST_TOSSES_START,
    });
    const { data } = await api.lastTosses();

    dispatch({
      type: LAST_TOSSES_SUCCESS,
      data,
    });
  } catch (error) {
    if (error?.response) {
      dispatch({
        type: LAST_TOSSES_ERROR,
        data: error?.response?.data?.message,
      });
      messages.error(error?.response?.data?.message);
    } else if (error?.request) {
      dispatch({
        type: LAST_TOSSES_ERROR,
        data: error?.request?.data?.message,
      });
      messages.error("Something went wrong!");
    } else if (error.message) {
      dispatch({ type: LAST_TOSSES_ERROR, data: error.message });
      messages.error("Something went wrong!");
    }
  }
};
