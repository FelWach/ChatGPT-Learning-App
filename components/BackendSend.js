import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import {OPENAI_API_KEY, IP_ADDRESS, PORT} from '@env'

export default function BackendSend() {

  const [input, setInput] = useState("");
  //const ipAddress = process.env.EXPO_PUBLIC_IP_ADDRESS;
  //const port = process.env.EXPO_PUBLIC_PORT;

  const sendData = () => {
    axios
      .post("http://" + IP_ADDRESS + ":" + PORT + "/saveData", {
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
