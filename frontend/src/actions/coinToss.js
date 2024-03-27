import * as api from "../api";
import * as messages from "../messages";
import { getLastTosses } from "./lastTosses";
import { getUserProfile } from "./userProfile";

export const COIN_TOSS_START = "COIN_TOSS_START";
export const COIN_TOSS_SUCCESS = "COIN_TOSS_SUCCESS";
export const COIN_TOSS_ERROR = "COIN_TOSS_ERROR";

export const doCoinToss = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: COIN_TOSS_START,
    });
    const { data } = await api.coinToss(formData);

    dispatch({
      type: COIN_TOSS_SUCCESS,
      data,
    });
    dispatch(getUserProfile());
    dispatch(getLastTosses());

    if (data.status) {
      messages.success(data.message);
    } else if (data.tokens) {
      messages.warning(data.message);
    } else {
      messages.error(data.message);
    }
  } catch (error) {
    if (error?.response) {
      dispatch({
        type: COIN_TOSS_ERROR,
        data: error?.response?.data?.message,
      });
      messages.error(error?.response?.data?.message);
    } else if (error?.request) {
      dispatch({
        type: COIN_TOSS_ERROR,
        data: error?.request?.data?.message,
      });
      messages.error("Something went wrong!");
    } else if (error.message) {
      dispatch({ type: COIN_TOSS_ERROR, data: error.message });
      messages.error("Something went wrong!");
    }
  }
};
