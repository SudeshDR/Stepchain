import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Pedometer } from "expo-sensors";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { fetchSepoliaBalance } from "../services/wallet";

const COIN_RATE = 0.001;

const Dashboard = ({ user }) => {
  const [steps, setSteps] = useState(0);
  const [coins, setCoins] = useState(0);
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("0.0");
  const [status, setStatus] = useState("Ready to track your steps.");

  useEffect(() => {
    let subscription;
    Pedometer.isAvailableAsync().then((available) => {
      if (!available) {
        setStatus("Pedometer not available on this device.");
        return;
      }
      setStatus("Tracking steps...");
      subscription = Pedometer.watchStepCount((result) => {
        setSteps(result.steps);
      });
    });

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  useEffect(() => {
    setCoins(Number((steps * COIN_RATE).toFixed(3)));
  }, [steps]);

  const greeting = useMemo(() => user?.email ?? "walker", [user]);

  const syncToFirebase = async () => {
    if (!user) {
      setStatus("Login required to sync.");
      return;
    }
    await setDoc(doc(db, "walks", user.uid), {
      steps,
      coins,
      updatedAt: new Date().toISOString(),
    });
    setStatus("Synced to Firebase.");
  };

  const fetchBalance = async () => {
    if (!walletAddress) {
      setStatus("Add a Sepolia wallet address.");
      return;
    }
    const value = await fetchSepoliaBalance(walletAddress);
    setBalance(value);
    setStatus("Balance fetched from Sepolia.");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Welcome, {greeting}</Text>
      <Text style={styles.status}>{status}</Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Today&apos;s Steps</Text>
        <Text style={styles.cardValue}>{steps}</Text>
        <Text style={styles.cardLabel}>Stepchain Coins</Text>
        <Text style={styles.cardValue}>{coins}</Text>
        <TouchableOpacity style={styles.secondaryButton} onPress={syncToFirebase}>
          <Text style={styles.secondaryButtonText}>Sync to Firebase</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Sepolia Wallet</Text>
        <TextInput
          style={styles.input}
          placeholder="0x..."
          placeholderTextColor="#7d7d7d"
          value={walletAddress}
          onChangeText={setWalletAddress}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.primaryButton} onPress={fetchBalance}>
          <Text style={styles.primaryButtonText}>Check Balance</Text>
        </TouchableOpacity>
        <Text style={styles.cardLabel}>Balance</Text>
        <Text style={styles.cardValue}>{balance} ETH</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0b0b",
  },
  content: {
    padding: 24,
  },
  title: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  status: {
    color: "#b5b5b5",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#161616",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardLabel: {
    color: "#a0a0a0",
    fontSize: 14,
    marginTop: 8,
  },
  cardValue: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#1f1f1f",
    color: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: "#4f7cff",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#4f7cff",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  secondaryButtonText: {
    color: "#9bb6ff",
    fontWeight: "600",
  },
});

export default Dashboard;
