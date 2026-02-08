import { ethers } from "ethers";

const SEPOLIA_RPC =
  process.env.EXPO_PUBLIC_SEPOLIA_RPC_URL || "https://rpc.sepolia.org";

export const fetchSepoliaBalance = async (address) => {
  const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC);
  const balance = await provider.getBalance(address);
  return ethers.formatEther(balance);
};
