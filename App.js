import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import ChatScreen from "./src/screens/ChatScreen";

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
        <ChatScreen />
      </SafeAreaView>
    </PaperProvider>
  );
};