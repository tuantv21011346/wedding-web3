// Network Configuration for Polygon Networks

/**
 * This file contains configuration for Polygon networks (Mumbai Testnet and Mainnet)
 * Used in the deployment scripts
 */

module.exports = {
  // Polygon Mumbai Testnet
  mumbai: {
    chainId: 80001,
    networkName: "Polygon Mumbai Testnet",
    rpcUrls: [
      "https://rpc-mumbai.maticvigil.com",
      "https://polygon-mumbai-bor.publicnode.com",
      "https://polygon-mumbai.blockpi.network/v1/rpc/public"
    ],
    blockExplorer: "https://mumbai.polygonscan.com",
    faucets: [
      "https://faucet.polygon.technology/",
      "https://mumbaifaucet.com/"
    ],
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC", 
      decimals: 18
    },
    // Biconomy specific configurations
    biconomy: {
      trustedForwarder: "0x9399BB24DBB5C4b782C70c2969F58716Ebbd6a3b", // Biconomy trusted forwarder on Mumbai
      apiKey: process.env.BICONOMY_API_KEY || "",
      dashboard: "https://dashboard.biconomy.io/"
    }
  },
  
  // Polygon Mainnet
  polygon: {
    chainId: 137,
    networkName: "Polygon Mainnet",
    rpcUrls: [
      "https://polygon-rpc.com",
      "https://polygon.llamarpc.com",
      "https://polygon-mainnet.public.blastapi.io"
    ],
    blockExplorer: "https://polygonscan.com",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC", 
      decimals: 18
    },
    // Biconomy specific configurations
    biconomy: {
      trustedForwarder: "0x86C80a8aa58e0A4fa09A69624c31Ab2a6CAD56b8", // Biconomy trusted forwarder on Polygon
      apiKey: process.env.BICONOMY_API_KEY || "",
      dashboard: "https://dashboard.biconomy.io/"
    }
  },
  
  // Wallet configurations
  wallet: {
    // Infura IPFS settings for image storage
    ipfs: {
      projectId: process.env.IPFS_PROJECT_ID || "",
      projectSecret: process.env.IPFS_PROJECT_SECRET || "",
      gateway: "https://ipfs.io/ipfs/"
    }
  }
};
