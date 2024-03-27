import { LOGIN, LOGOUT } from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";
import {jwtDecode} from "jwt-decode";

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: LOGIN, data });
    history("/");
    messages.success("Login Successful");
  } catch (error) {
    messages.error(error.response.data.message);
  }
};

export const login = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    dispatch({ type: LOGIN, data });
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

export const coinToss = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.coinToss(formData);
    if(data.hasOwnProperty('tokens')) {
      localStorage.setItem('tokens', data.tokens);
    }
    if(data.status) {
      messages.success(data.message);
    } else if(data.tokens) {
      messages.warning(data.message);
    } else {
      messages.error(data.message);
    }
    history("/");
  } catch (error) {
    messages.error(error.response.data.message);
  }
};