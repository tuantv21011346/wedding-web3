# Wedding Web3 - Deployment Guide

This guide walks you through the final steps to complete your Web3 wedding website with the Polygon blockchain integration.

## 1. Install the required dependencies

First, install the Hardhat dependencies needed for smart contract deployment:

```bash
npm install --save-dev @nomicfoundation/hardhat-toolbox @nomiclabs/hardhat-ethers @nomiclabs/hardhat-etherscan hardhat dotenv solc
```

## 2. Configure your environment variables

Make a copy of `.env.example` to `.env` and fill in the required values:

```bash
# Run the helper script
./run.ps1 env:setup

# Then edit .env with your values
notepad .env
```

Required environment variables:
- `PRIVATE_KEY`: Your Ethereum wallet private key for contract deployment
- `MUMBAI_RPC_URL`: Mumbai testnet RPC URL (from Infura, Alchemy, etc.)
- `POLYGON_RPC_URL`: Polygon mainnet RPC URL
- `VITE_BICONOMY_API_KEY`: API key from Biconomy dashboard
- `POLYGONSCAN_API_KEY`: API key for contract verification
- `VITE_ALCHEMY_ID`: API key for Alchemy provider
- `VITE_WALLET_CONNECT_ID`: Project ID for WalletConnect
- `VITE_INFURA_IPFS_PROJECT_ID`: Infura IPFS project ID
- `VITE_INFURA_IPFS_PROJECT_SECRET`: Infura IPFS project secret

## 3. Deploy Contracts to Mumbai Testnet

Deploy your contracts to the Mumbai testnet first to test functionality:

```bash
# Deploy using the hardhat script
./run.ps1 deploy:mumbai

# Test the deployment
./run.ps1 test:mumbai
```

## 4. Set up Biconomy for Gasless Transactions

Configure Biconomy to enable gasless transactions for your guests:

```bash
# Run the helper script that guides you through Biconomy setup
./run.ps1 biconomy:setup
```

Remember to add your API key to the `.env` file.

## 5. Test Gasless Transactions

After setting up Biconomy, test sending a wish using the gasless transaction feature:

1. Start the development server
   ```bash
   ./run.ps1 dev
   ```

2. Navigate to the "Wishes" page in your app
3. Connect your wallet
4. Submit a test message to verify that guests won't need to pay for gas

## 6. Deploy to Polygon Mainnet

Once everything is working correctly on Mumbai testnet, deploy to Polygon mainnet:

```bash
# Deploy to Polygon mainnet
./run.ps1 deploy:polygon

# Test the deployment
./run.ps1 test:polygon
```

## 7. Set up Biconomy for Mainnet

Repeat the Biconomy setup process for your Polygon mainnet contract:

```bash
# Configure Biconomy for mainnet
./run.ps1 biconomy:setup
```

## 8. Build and Deploy Website

Build your website for production and deploy it to your hosting service:

```bash
# Build the production version
./run.ps1 build
```

The built files will be in the `dist` directory, which you can upload to your preferred hosting service.

## 9. Congratulations!

Your Web3 wedding website is now complete! Your guests can:

- Connect their Web3 wallet (MetaMask, Coinbase Wallet, etc.)
- Send wedding wishes that are stored permanently on the blockchain
- Upload images that are stored on IPFS
- All without paying any gas fees (you cover them through Biconomy)

Enjoy your special day knowing your wedding memories are preserved on the blockchain forever! 💍
