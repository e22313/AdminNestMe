import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator, // Thêm ActivityIndicator từ react-native
} from "react-native";
import { login } from "../../redux/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const LoginTest = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.isLoggedIn);
  const isAuthenticated = !!authToken;
  const loginFail = useSelector((state) => state.auth.error);
  const isLoginFail = !!loginFail;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false); // State variable to control loading state

  const handleLogin = async () => {
    if (
      checkFieldNotEmpty(username, setUsernameError) === false ||
      checkFieldNotEmpty(password, setPasswordError) === false
    ) {
      console.log("Fields cannot be empty");
    } else {
      setLoading(true); // Bắt đầu hiển thị loading khi gọi API
      try {
        await dispatch(login(username, password));
      } catch (error) {
        setLoginError("Username or password is incorrect");
      } finally {
        setLoading(false); // Kết thúc loading sau khi hoàn thành hoặc gặp lỗi
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate("Main");
    }
    if (isLoginFail) {
      setLoginError("Username or password is incorrect");
    }
  }, [isAuthenticated, navigation, isLoginFail]);

  const checkFieldNotEmpty = (value, setError) => {
    if (value.trim() === "") {
      setError("Field cannot be empty");
      return false;
    }
    setError("");
    return true;
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, usernameError && styles.inputError]}
        placeholder="Username"
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          setUsernameError("");
        }}
      />
      {usernameError ? (
        <Text style={styles.errorText}>{usernameError}</Text>
      ) : null}
      <View
        style={[styles.passwordContainer, passwordError && styles.inputError]}
      >
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError("");
          }}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.iconContainer}
        >
          <Icon
            name={showPassword ? "eye-slash" : "eye"}
            size={20}
            color="#000"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}
      {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}
      <Button title="Sign in" onPress={handleLogin} />
      {loading && <ActivityIndicator style={styles.loadingIndicator} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
    marginBottom: 20,
  },
  passwordInput: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
  icon: {
    marginRight: 10,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default LoginTest;
