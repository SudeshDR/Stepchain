import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const AuthScreen = ({ onAuthed }) => {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    if (mode === "login") {
      const result = await signInWithEmailAndPassword(auth, email, password);
      onAuthed(result.user);
      return;
    }
    const result = await createUserWithEmailAndPassword(auth, email, password);
    onAuthed(result.user);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stepchain</Text>
      <Text style={styles.subtitle}>
        {mode === "login" ? "Login" : "Register"}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#7d7d7d"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#7d7d7d"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.primaryButton} onPress={submit}>
        <Text style={styles.primaryButtonText}>
          {mode === "login" ? "Login" : "Create Account"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => setMode(mode === "login" ? "register" : "login")}
      >
        <Text style={styles.linkText}>
          {mode === "login"
            ? "Need an account? Register"
            : "Already have an account? Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#0b0b0b",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#b5b5b5",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#1b1b1b",
    color: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: "#4f7cff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  linkButton: {
    marginTop: 16,
    alignItems: "center",
  },
  linkText: {
    color: "#9bb6ff",
  },
  error: {
    color: "#ff6b6b",
    marginBottom: 8,
  },
});

export default AuthScreen;
