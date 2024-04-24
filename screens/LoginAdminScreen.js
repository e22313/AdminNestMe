import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import axios from "axios";

const MyComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://nestme-server.onrender.com/api/auth/alogin",
        {
          username: username,
          password: password,
        }
      );
      setResponse(response.data);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      {response && <Text>{JSON.stringify(response)}</Text>}
    </View>
  );
};

export default MyComponent;
