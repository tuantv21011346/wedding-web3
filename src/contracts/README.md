# Smart Contract Deployment Guide

This directory contains the smart contracts for the MITU website, which allow guests to send wishes that are stored on the Polygon blockchain.

## Contract Architecture

The project consists of two main contracts:

1. **WeddingWishes.sol**: The main contract that stores wedding wishes sent by guests.
2. **WeddingWishesForwarder.sol**: A forwarder contract that enables gasless transactions through Biconomy.

## Deployment Steps

### Prerequisites

1. Create an account on [Biconomy Dashboard](https://dashboard.biconomy.io/)
2. Set up your `.env` file with the required values (see `.env.example` for reference)

### Deploy to Mumbai Testnet

```bash
# Install dependencies if you haven't already
npm install

# Deploy contracts to Mumbai testnet
npm run deploy:mumbai

# If verification fails during deployment, verify contracts manually
npm run verify:mumbai -- --address <CONTRACT_ADDRESS> --contract WeddingWishes.sol:WeddingWishes
npm run verify:mumbai -- --address <FORWARDER_ADDRESS> --contract WeddingWishesForwarder.sol:WeddingWishesForwarder --args <WEDDINGWISHES_ADDRESS>,<BICONOMY_FORWARDER>
```

### Deploy to Polygon Mainnet

```bash
# Deploy contracts to Polygon mainnet
npm run deploy:polygon

# If verification fails during deployment, verify contracts manually
npm run verify:polygon -- --address <CONTRACT_ADDRESS> --contract WeddingWishes.sol:WeddingWishes
npm run verify:polygon -- --address <FORWARDER_ADDRESS> --contract WeddingWishesForwarder.sol:WeddingWishesForwarder --args <WEDDINGWISHES_ADDRESS>,<BICONOMY_FORWARDER>
```

## Biconomy Setup (Post Deployment)

After deploying your contracts, you need to set up Biconomy to enable gasless transactions:

1. Go to [Biconomy Dashboard](https://dashboard.biconomy.io/)
2. Create a new app
3. Add your contract's address
4. Set up the relevant methods as "gasless"
5. Get your API key and add it to your `.env` file

## Contract Interaction

The project includes React hooks to interact with the deployed contracts:

- `useWeddingContract.ts`: For reading wishes and displaying them
- `useBiconomy.ts`: For sending gasless transactions
- `useIPFS.ts`: For uploading images associated with wishes

## Security Considerations

- The contracts use a trusted forwarder pattern for gasless transactions
- Only the contract owner can set trusted forwarders
- Make sure to keep your private keys secure and never commit them to git
