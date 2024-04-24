import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import axios from "axios";

const Http = () => {
  const [responseData, setResponseData] = useState(null);

  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NmZlZmNlZTIxZDdiYmQyZDk1YWEzZCIsInB3IjoiJDJiJDEwJG9TZ3NOaWpDbVN3Rks0WkpTZ0NtRi5lV0hVU0M1VUVwci9FTjQxMGZiUTJlbDVWaGVQT25DIiwiZm4iOiJOZ3V54buFbiBWxINuIEEiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNzEwOTA1ODI2LCJleHAiOjE3MTA5MzQ2MjZ9.hpS8LfFh5xyf681xzQapqrt5K0WZm17lkxdJQHsPNho"; // AccessToken cố định

  const fetchDataWithAccessToken = async () => {
    try {
      const response = await axios.get(
        "https://nestme-server.onrender.com/api/admin/user?page=1&limit=1&search",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setResponseData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <View>
      <Button title="Fetch Data" onPress={fetchDataWithAccessToken} />
      {responseData && <Text>{JSON.stringify(responseData)}</Text>}
    </View>
  );
};

export default Http;
