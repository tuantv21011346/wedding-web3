# Contract Deployment Guide

This guide explains how to deploy the Wedding Wishes smart contracts to both Polygon Mumbai Testnet and Polygon Mainnet.

## Prerequisites

Before deployment, make sure you have:

1. Node.js and npm installed
2. A wallet with MATIC tokens for both Mumbai testnet and Polygon mainnet
3. A Biconomy account with API keys configured
4. An Infura account with IPFS project credentials

## Setup

1. First, create a `.env` file in the project root by copying `.env.example`:

```bash
cp .env.example .env
```

2. Fill in all the required environment variables in `.env`:

```
# Wallet and RPC URLs
DEPLOYER_PRIVATE_KEY=your_private_key_here
MUMBAI_RPC_URL=https://rpc-mumbai.maticvigil.com
POLYGON_RPC_URL=https://polygon-rpc.com

# Biconomy Trusted Forwarder addresses
BICONOMY_TRUSTED_FORWARDER_MUMBAI=0x...
BICONOMY_TRUSTED_FORWARDER_POLYGON=0x...

# Biconomy API Keys
VITE_BICONOMY_API_KEY=your_biconomy_api_key_here

# Contract Addresses (these will be filled automatically after deployment)
VITE_CONTRACT_ADDRESS_MUMBAI=
VITE_FORWARDER_ADDRESS_MUMBAI=
VITE_CONTRACT_ADDRESS_POLYGON=
VITE_FORWARDER_ADDRESS_POLYGON=

# Alchemy API Key for RPC Provider
VITE_ALCHEMY_ID=your_alchemy_id_here

# WalletConnect Project ID
VITE_WALLET_CONNECT_ID=your_wallet_connect_id_here

# Infura IPFS Credentials
VITE_INFURA_IPFS_PROJECT_ID=your_infura_ipfs_project_id_here
VITE_INFURA_IPFS_PROJECT_SECRET=your_infura_ipfs_project_secret_here
```

3. Install deployment dependencies:

```bash
npm install --save-dev solc@0.8.17
```

## Deploying to Mumbai Testnet

To deploy the contracts to Mumbai testnet, run:

```bash
node scripts/deploy.js mumbai
```

## Deploying to Polygon Mainnet

To deploy the contracts to Polygon mainnet, run:

```bash
node scripts/deploy.js polygon
```

## After Deployment

After successful deployment, you should:

1. **Verify your contracts on Polygonscan**:
   - Go to [Mumbai Polygonscan](https://mumbai.polygonscan.com/) or [Polygon Mainnet Polygonscan](https://polygonscan.com/)
   - Search for your contract addresses
   - Click on the "Verify and Publish" link
   - Select "Solidity (Standard JSON Input)" as the compiler type
   - Upload the contract source and verify

2. **Configure Biconomy**:
   - Log into your Biconomy dashboard
   - Register your contract addresses
   - Configure the forwarding rules for meta-transactions

3. **Test the deployment**:
   - On the website, submit a wish using the "Connect Wallet" option
   - Verify that the transaction is processed without the user paying gas fees
   - Check that the wish appears in the wishes list

4. **Update your frontend configuration**:
   - The script automatically updates your .env file with the deployed contract addresses
   - Make sure you run `npm run build` to incorporate the new environment variables

## Important Notes

- Keep your private keys secure and never commit them to version control
- For production, use a separate account with limited funds for deployment
- Always test thoroughly on Mumbai testnet before deploying to mainnet
- Monitor your deployed contracts for any unusual activity
