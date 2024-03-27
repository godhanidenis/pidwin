import * as api from "../api";
import * as messages from "../messages";
import { LOGOUT } from "../reducers";
import { getUserProfile } from "./userProfile";

export const LOGIN = "LOGIN";

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    localStorage.setItem("profile", JSON.stringify({ ...data }));
    dispatch({ type: LOGIN, data });
    dispatch(getUserProfile());
    history("/");
    messages.success("Login Successful");
  } catch (error) {
    messages.error(error.response.data.message);
  }
};

export const login = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    localStorage.setItem("profile", JSON.stringify({ ...data }));
    dispatch({ type: LOGIN, data });
    dispatch(getUserProfile());
    history("/");
    messages.success("Login Successful");
  } catch (error) {
    messages.error(error.response.data.message);
  }
};

export const changePassword = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.changePassword(formData);
    dispatch({ type: LOGOUT, data });
    messages.success("Password Change Was Successful");
    history("/");
  } catch (error) {
    messages.error(error.response.data.message);
  }
};
