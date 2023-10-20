import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import axios from "axios";

export default function BackendSend() {
  const [input, setInput] = useState("");

  const sendData = () => {
    axios
      .post("https://pro5-backend.onrender.com/saveData", {
        data: input,
      })
      .then((response) => {
        console.log("Data sent successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  return (
    <View>
      <TextInput placeholder="Input" onChangeText={setInput} value={input} />
      <Button title="Submit" onPress={sendData} />
    </View>
  );
}
