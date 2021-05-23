import * as types from "../constants/user.constants";

const token = localStorage.getItem("accessToken");

const initialState = {
  id: null,
  email: [],
  password: "",
  loading: false,
  isAuthenticated: !!token,
  isRegisterd: false,
  redirectToLoginPage: false,
  redirectToHomePage: false,
};

const userReducer = (state = initialState, action) => {
   const { type, payload } = action;

  switch (type) {
    case types.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        isRegisterd: true,
        loading: false,
        redirectToLoginPage: true,
      };
    case types.LOGIN_REQUEST:
      return {
        state,
        loading: true,
      };
    case types.LOGIN_SUCCESS:
      const { accessToken , user:{email}, 

      } = payload
      localStorage.setItem("accessToken", accessToken);

      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        redirectToHomePage: true,
        accessToken,
        email,
      };
    case types.REGISTER_FAILURE:
    default:
      return state;
  }
};

export default userReducer;
