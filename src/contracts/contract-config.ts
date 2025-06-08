/**
 * Contract configuration exports
 */

// Contract addresses for Polygon Mumbai testnet and Mainnet
export const CONTRACT_ADDRESSES = {
  mumbai: {
    weddingWishes: import.meta.env.VITE_CONTRACT_ADDRESS_MUMBAI || "0x0000000000000000000000000000000000000000",
    weddingWishesForwarder: import.meta.env.VITE_FORWARDER_ADDRESS_MUMBAI || "0x0000000000000000000000000000000000000000",
    biconomyForwarder: "0x9399BB24DBB5C4b782C70c2969F58716Ebbd6a3b" // Biconomy's trusted forwarder on Mumbai
  },
  polygon: {
    weddingWishes: import.meta.env.VITE_CONTRACT_ADDRESS_POLYGON || "0x0000000000000000000000000000000000000000",
    weddingWishesForwarder: import.meta.env.VITE_FORWARDER_ADDRESS_POLYGON || "0x0000000000000000000000000000000000000000",
    biconomyForwarder: "0x86C80a8aa58e0A4fa09A69624c31Ab2a6CAD56b8" // Biconomy's trusted forwarder on Polygon
  },
};

// Network configuration for UI display
export const NETWORK_CONFIG = {
  mumbai: {
    chainId: 80001,
    name: "Polygon Mumbai",
    currency: "MATIC",
    explorer: "https://mumbai.polygonscan.com",
    rpcUrl: "https://rpc-mumbai.maticvigil.com",
    isTestnet: true
  },
  polygon: {
    chainId: 137,
    name: "Polygon",
    currency: "MATIC",
    explorer: "https://polygonscan.com",
    rpcUrl: "https://polygon-rpc.com",
    isTestnet: false
  }
};

// Wish interface
export interface Wish {
  sender: string;
  message: string;
  timestamp: number;
  senderName: string;
  imageIpfsHash: string;
}

// Contract ABI for WeddingWishes
export const WEDDING_WISHES_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "senderName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "imageIpfsHash",
        "type": "string"
      }
    ],
    "name": "WishAdded",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_message",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_senderName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_imageIpfsHash",
        "type": "string"
      }
    ],
    "name": "addWish",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllWishes",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "message",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "senderName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "imageIpfsHash",
            "type": "string"
          }
        ],
        "internalType": "struct WeddingWishes.Wish[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "getWishAt",
    "outputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "message",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "senderName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "imageIpfsHash",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getWishCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "wishes",
    "outputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "message",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "senderName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "imageIpfsHash",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// CONTRACT_ADDRESSES already defined at the top of the file
