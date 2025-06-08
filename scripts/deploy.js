// deploy.js - Script for deploying the wedding contracts to Polygon networks
require('dotenv').config();
const hre = require('hardhat');
const { ethers } = require('hardhat');
const fs = require('fs');
const path = require('path');

// Check if required environment variables exist
const requiredEnvVars = [
  'PRIVATE_KEY', 
  'MUMBAI_RPC_URL',
  'POLYGON_RPC_URL'
];

// Other variables that will default if not present
const defaultValues = {
  'BICONOMY_TRUSTED_FORWARDER_MUMBAI': '0x9399BB24DBB5C4b782C70c2969F58716Ebbd6a3b', // Biconomy Trusted Forwarder on Mumbai
  'BICONOMY_TRUSTED_FORWARDER_POLYGON': '0x86C80a8aa58e0A4fa09A69624c31Ab2a6CAD56b8'  // Biconomy Trusted Forwarder on Polygon Mainnet
};

// Check required env vars
requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    console.error(`Environment variable ${varName} is not set. Please create a .env file with this variable.`);
    process.exit(1);
  }
});

// Set defaults for optional vars
Object.entries(defaultValues).forEach(([key, value]) => {
  if (!process.env[key]) {
    process.env[key] = value;
    console.log(`Using default value for ${key}: ${value}`);
  }
});

// Network configurations
const networks = {
  mumbai: {
    name: 'Mumbai Testnet',
    url: process.env.MUMBAI_RPC_URL,
    chainId: 80001,
    trustedForwarder: process.env.BICONOMY_TRUSTED_FORWARDER_MUMBAI,
    gasPrice: ethers.utils.parseUnits('30', 'gwei')
  },
  polygon: {
    name: 'Polygon Mainnet',
    url: process.env.POLYGON_RPC_URL,
    chainId: 137,
    trustedForwarder: process.env.BICONOMY_TRUSTED_FORWARDER_POLYGON,
    gasPrice: ethers.utils.parseUnits('150', 'gwei')
  }
};

// Helper function to compile and deploy the contracts
async function deployContracts(networkName) {
  console.log(`\nDeploying contracts to ${networks[networkName].name}...`);
  
  try {
    // Create provider and wallet
    const provider = new ethers.providers.JsonRpcProvider(networks[networkName].url);
    const wallet = new ethers.Wallet(process.env.DEPLOYER_PRIVATE_KEY, provider);
    const signer = wallet.connect(provider);
    
    console.log(`Deployer address: ${wallet.address}`);
    const balance = await provider.getBalance(wallet.address);
    console.log(`Deployer balance: ${ethers.utils.formatEther(balance)} MATIC`);
    
    // Check for sufficient balance
    if (balance.lt(ethers.utils.parseEther('0.1'))) {
      console.error(`Deployer has insufficient funds. Please add more MATIC to ${wallet.address}`);
      return;
    }

    // Compile contracts
    console.log('Compiling contracts...');
    const solc = require('solc');
    
    const input = {
      language: 'Solidity',
      sources: {
        'WeddingWishes.sol': { content: weddingWishesSource },
        'WeddingWishesForwarder.sol': { content: weddingWishesForwarderSource }
      },
      settings: {
        outputSelection: {
          '*': {
            '*': ['*']
          }
        },
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    };
    
    const output = JSON.parse(solc.compile(JSON.stringify(input)));
    
    // Check for compilation errors
    if (output.errors) {
      output.errors.forEach(error => {
        console.error(error.formattedMessage);
      });
      
      if (output.errors.some(error => error.severity === 'error')) {
        console.error('Compilation failed');
        return;
      }
    }
    
    // Get contract factories
    const weddingWishesAbi = output.contracts['WeddingWishes.sol']['WeddingWishes'].abi;
    const weddingWishesBytecode = output.contracts['WeddingWishes.sol']['WeddingWishes'].evm.bytecode.object;
    
    const weddingForwarderAbi = output.contracts['WeddingWishesForwarder.sol']['WeddingWishesForwarder'].abi;
    const weddingForwarderBytecode = output.contracts['WeddingWishesForwarder.sol']['WeddingWishesForwarder'].evm.bytecode.object;
    
    // Deploy WeddingWishes contract
    console.log('Deploying WeddingWishes contract...');
    const WeddingWishesFactory = new ethers.ContractFactory(
      weddingWishesAbi,
      weddingWishesBytecode,
      signer
    );
    
    const weddingWishes = await WeddingWishesFactory.deploy({
      gasPrice: networks[networkName].gasPrice
    });
    
    console.log(`WeddingWishes deployed to: ${weddingWishes.address}`);
    await weddingWishes.deployed();
    
    // Deploy WeddingWishesForwarder contract
    console.log('Deploying WeddingWishesForwarder contract...');
    const WeddingWishesForwarderFactory = new ethers.ContractFactory(
      weddingForwarderAbi,
      weddingForwarderBytecode,
      signer
    );
    
    const weddingWishesForwarder = await WeddingWishesForwarderFactory.deploy(
      weddingWishes.address,
      networks[networkName].trustedForwarder,
      {
        gasPrice: networks[networkName].gasPrice
      }
    );
    
    console.log(`WeddingWishesForwarder deployed to: ${weddingWishesForwarder.address}`);
    await weddingWishesForwarder.deployed();
    
    // Store contract addresses in .env file
    const envContent = fs.readFileSync(path.join(__dirname, '../.env'), 'utf8');
    const updatedEnvContent = envContent
      .replace(
        new RegExp(`VITE_CONTRACT_ADDRESS_${networkName.toUpperCase()}=.*`),
        `VITE_CONTRACT_ADDRESS_${networkName.toUpperCase()}=${weddingWishes.address}`
      )
      .replace(
        new RegExp(`VITE_FORWARDER_ADDRESS_${networkName.toUpperCase()}=.*`),
        `VITE_FORWARDER_ADDRESS_${networkName.toUpperCase()}=${weddingWishesForwarder.address}`
      );
    
    fs.writeFileSync(path.join(__dirname, '../.env'), updatedEnvContent);
    console.log('Updated .env file with contract addresses');
    
    return {
      weddingWishes: weddingWishes.address,
      weddingWishesForwarder: weddingWishesForwarder.address
    };
  } catch (error) {
    console.error(`Error deploying to ${networks[networkName].name}:`, error);
  }
}

// Main function
async function main() {
  console.log('Wedding Contracts Deployment Script');
  console.log('==================================');
  
  const args = process.argv.slice(2);
  const networkName = args[0] || 'mumbai'; // Default to Mumbai testnet
  
  if (!networks[networkName]) {
    console.error(`Network "${networkName}" not configured. Available networks: ${Object.keys(networks).join(', ')}`);
    process.exit(1);
  }
  
  const addresses = await deployContracts(networkName);
  
  if (addresses) {
    console.log('\nDeployment successful!');
    console.log('==================================');
    console.log(`Network: ${networks[networkName].name}`);
    console.log(`WeddingWishes contract: ${addresses.weddingWishes}`);
    console.log(`WeddingWishesForwarder contract: ${addresses.weddingWishesForwarder}`);
    console.log('==================================');
    console.log('Next steps:');
    console.log('1. Verify contracts on Polygonscan');
    console.log('2. Set up Biconomy Dashboard for the contracts');
    console.log('3. Update your .env file with the contract addresses');
  }
}

// Execute the script
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
