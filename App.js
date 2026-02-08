import React, { useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import AuthScreen from "./src/screens/AuthScreen";
import Dashboard from "./src/screens/Dashboard";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0b0b0b" }}>
      <StatusBar barStyle="light-content" />
      {user ? <Dashboard user={user} /> : <AuthScreen onAuthed={setUser} />}
    </SafeAreaView>
  );
};

export default App;
