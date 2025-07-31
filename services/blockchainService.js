import { web3, loyaltyToken } from "../config/blockchain.js";

// Function to mint tokens (Admin only)
export const mintTokens = async (to, amount) => {
  try {
    if (!web3 || !loyaltyToken) {
      throw new Error("Blockchain connection not available");
    }
    
    const accounts = await web3.eth.getAccounts();
    if (!accounts || accounts.length === 0) {
      throw new Error("No accounts available");
    }
    
    const tx = await loyaltyToken.methods.mint(to, amount).send({ from: accounts[0] });
    console.log("Tokens minted:", tx);
    return tx;
  } catch (error) {
    console.error("Error minting tokens:", error);
    throw error;
  }
};

// Function to burn tokens
export const burnTokens = async (from, amount) => {
  try {
    if (!web3 || !loyaltyToken) {
      throw new Error("Blockchain connection not available");
    }
    
    const accounts = await web3.eth.getAccounts();
    if (!accounts || accounts.length === 0) {
      throw new Error("No accounts available");
    }
    
    const tx = await loyaltyToken.methods.burn(from, amount).send({ from: accounts[0] });
    console.log("Tokens burned:", tx);
    return tx;
  } catch (error) {
    console.error("Error burning tokens:", error);
    throw error;
  }
};

// Get token balance
export const getTokenBalance = async (address) => {
  try {
    if (!web3 || !loyaltyToken) {
      throw new Error("Blockchain connection not available");
    }
    
    if (!web3.utils.isAddress(address)) {
      throw new Error("Invalid wallet address format");
    }
    
    const balance = await loyaltyToken.methods.balanceOf(address).call();
    console.log("Token Balance:", balance);
    return balance;
  } catch (error) {
    console.error("Error getting balance:", error);
    throw error;
  }
};
