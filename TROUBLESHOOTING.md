# Troubleshooting Guide

## "Failed to fetch token balance" Error

This error typically occurs due to blockchain configuration issues. Follow these steps to resolve:

### 1. Check Environment Variables

Ensure you have a `.env` file in your project root with the following variables:

```env
# Database Configuration
MONGO_URL=mongodb://localhost:27017/bookstore

# JWT Secret
JWT_SECRET=your_jwt_secret_here

# Blockchain Configuration
ALCHEMY_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY
CONTRACT1_ADDRESS=0x0000000000000000000000000000000000000000
CONTRACT2_ADDRESS=0x0000000000000000000000000000000000000000

# Admin Wallet Configuration
ADMIN_WALLET_ADDRESS=0x0000000000000000000000000000000000000000
ADMIN_PRIVATE_KEY=your_admin_private_key_here
```

### 2. Verify Blockchain Connection

Test your blockchain connection by visiting:
```
http://localhost:8080/api/v1/book/health
```

This endpoint will show:
- Blockchain connection status
- Contract deployment status
- Environment variable status

### 3. Common Issues and Solutions

#### Issue: "Missing required environment variable"
**Solution**: Set all required environment variables in your `.env` file

#### Issue: "Blockchain network unavailable"
**Solution**: 
- Check your Alchemy API key
- Ensure you're using the correct network (Sepolia testnet)
- Verify your Alchemy account has sufficient requests

#### Issue: "Contract not available"
**Solution**:
- Verify contract addresses are correct
- Ensure contracts are deployed to the correct network
- Check if contracts are properly initialized

#### Issue: "Invalid wallet address format"
**Solution**:
- Ensure wallet addresses are valid Ethereum addresses
- Check for typos in wallet addresses

### 4. Debugging Steps

1. **Check Server Logs**: Look for error messages in your server console
2. **Check Browser Console**: Look for network errors in browser developer tools
3. **Test API Endpoint**: Use Postman or curl to test `/api/v1/book/getBalance?address=YOUR_ADDRESS`
4. **Verify Wallet Connection**: Ensure the user's wallet is properly connected

### 5. Testing the Fix

1. Restart your server after making changes
2. Clear browser cache and local storage
3. Reconnect your wallet
4. Try fetching token balance again

### 6. Additional Resources

- [Web3.js Documentation](https://web3js.org/)
- [Alchemy Documentation](https://docs.alchemy.com/)
- [Ethereum Address Validation](https://ethereum.org/en/developers/docs/accounts/)

If you continue to experience issues, check the server logs for specific error messages and ensure all environment variables are properly configured. 