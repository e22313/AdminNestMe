import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk"; // Sử dụng Redux Thunk middleware nếu cần
import rootReducer from "./rootReducer"; // Import rootReducer chứa tất cả các reducers của bạn

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;
