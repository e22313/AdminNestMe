import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage từ thư viện react-native-async-storage
import { BASE_API_URL } from "../../config/api";
import {
  REGISTER,
  UPDATE_USER,
  REQ_USER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SEARCH_USER,
  LOGOUT,
} from "./actionType";
import { useNavigation } from "@react-navigation/native";
export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://nestme-server.onrender.com/api/auth/alogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (data.accessToken) {
          await AsyncStorage.setItem("token", data.accessToken); // Lưu token vào AsyncStorage
          dispatch({ type: LOGIN_SUCCESS, payload: data.accessToken });

          console.log("Đăng nhập thành công:", data.accessToken);
        }
      } else {
        dispatch({ type: LOGIN_FAILURE, payload: data }); // Gửi action khi đăng nhập thất bại
      }
    } catch (error) {
      console.error("Đăng nhập không thành công:", error);
      dispatch({ type: LOGIN_FAILURE, payload: error });
    }
  };
};
