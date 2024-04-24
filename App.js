import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import store from "./redux/store";
import LoginTest from "./screens/auth/Login";
import DashboardScreen from "./screens/DashboardScreen";
import ManageUsersScreen from "./screens/ManageUsersScreen";
import ManagePostsScreen from "./screens/ManagePostsScreen";
import InstagramLikeGallery from "./screens/InstagramLikeGallery";

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginTest}
            options={{ headerShown: false }} // Hide the header for Login screen
          />
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ headerShown: false }} // Hide the header for Main screen
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const MainScreen = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#3c0a6b" },
        headerTintColor: "white",
        tabBarActiveTintColor: "#3c0a6b",
      }}
    >
      <BottomTab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="apps" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="User"
        component={ManageUsersScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Posts"
        component={ManagePostsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="create" color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default App;
