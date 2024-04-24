import {
  REGISTER,
  UPDATE_USER,
  REQ_USER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SEARCH_USER,
  LOGOUT,
} from "./actionType";
const initialState = {
  isLoggedIn: false,
  userData: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userData: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
