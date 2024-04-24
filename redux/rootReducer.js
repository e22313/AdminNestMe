import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  // Thêm reducers khác nếu cần
});

export default rootReducer;
