import * as types from "../constants/user.constants";

import api from "../api";

const register = (name , email, password) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_REQUEST });
    const { data } = await api.post("/users", {name ,  email, password });
    dispatch({ type: types.REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.REGISTER_FAILURE });
    console.log({ error });
  }
};

const login = ( email, password) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_REQUEST });
    const { data: {data} } = await api.post("/users", { email, password });
    dispatch({ type: types.LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.LOGIN_FAILURE });
    console.log({ error });
  }
};
const authActions = {
  register,
  login,
};

export { authActions };
