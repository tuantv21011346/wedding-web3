# Deployment Configuration

This folder contains scripts and configurations for deploying the Wedding Web3 contracts to Polygon networks.

## Required Environment Variables

Before using any script in this folder, make sure to set up these environment variables in your `.env` file:

```
# Wallet and RPC URLs
DEPLOYER_PRIVATE_KEY=your_private_key_here
MUMBAI_RPC_URL=https://rpc-mumbai.maticvigil.com
POLYGON_RPC_URL=https://polygon-rpc.com

# Biconomy Trusted Forwarder addresses
BICONOMY_TRUSTED_FORWARDER_MUMBAI=0x...
BICONOMY_TRUSTED_FORWARDER_POLYGON=0x...
```

## Available Scripts

- `deploy.js` - Deploy contracts to a specified network (Mumbai or Polygon)

## Usage

```bash
# Deploy to Mumbai Testnet
node scripts/deploy.js mumbai

# Deploy to Polygon Mainnet
node scripts/deploy.js polygon
```

## After Deployment

After successful deployment:

1. The contract addresses will be automatically added to your `.env` file
2. Verify your contracts on Polygonscan
3. Set up your Biconomy dashboard with the deployed contract addresses
4. Update your frontend to use the new contract addresses
