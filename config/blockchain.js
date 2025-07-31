import dotenv from 'dotenv';
import { Web3 } from 'web3';
import fs from 'fs';


const LoyaltyTokenABI = JSON.parse(fs.readFileSync(new URL('../abis/LoyaltyToken.json', import.meta.url)));



dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['CONTRACT1_ADDRESS', 'CONTRACT2_ADDRESS'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

// Use environment variable for Alchemy URL or fallback to a default
const ALCHEMY_URL = process.env.ALCHEMY_URL || "https://eth-sepolia.g.alchemy.com/v2/LBUArw0Kxp7RZD3KDiHwmt1g42LstQ4y";

const web3 = new Web3(ALCHEMY_URL);

const contractAddress1 = process.env.CONTRACT1_ADDRESS;
const contractAddress2 = process.env.CONTRACT2_ADDRESS;

const contractABI = LoyaltyTokenABI;
const loyaltyToken = new web3.eth.Contract(contractABI, contractAddress1);
const walletManager = new web3.eth.Contract(contractABI, contractAddress2);

// Test the connection
web3.eth.net.isListening()
  .then(() => console.log('Web3 connection successful'))
  .catch((error) => console.error('Web3 connection failed:', error));

export {
    web3,
    loyaltyToken,
    walletManager,
}