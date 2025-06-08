// hardhat-deploy.js - Script for deploying the wedding contracts to Polygon networks
require('dotenv').config();
const hre = require('hardhat');
const fs = require('fs');
const path = require('path');
const { ethers } = require('hardhat');

// Other variables that will default if not present
const defaultValues = {
  'BICONOMY_TRUSTED_FORWARDER_MUMBAI': '0x9399BB24DBB5C4b782C70c2969F58716Ebbd6a3b', // Biconomy Trusted Forwarder on Mumbai
  'BICONOMY_TRUSTED_FORWARDER_POLYGON': '0x86C80a8aa58e0A4fa09A69624c31Ab2a6CAD56b8'  // Biconomy Trusted Forwarder on Polygon Mainnet
};

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
    name: 'Polygon Mumbai Testnet',
    chainId: 80001,
    trustedForwarder: process.env.BICONOMY_TRUSTED_FORWARDER_MUMBAI
  },
  polygon: {
    name: 'Polygon Mainnet',
    chainId: 137,
    trustedForwarder: process.env.BICONOMY_TRUSTED_FORWARDER_POLYGON
  }
};

// Helper function to deploy the contracts
async function deployContracts(networkName) {
  console.log(`\nDeploying contracts to ${networks[networkName].name}...`);
  
  try {
    // Set the network for Hardhat
    const networkConfig = hre.config.networks[networkName];
    if (!networkConfig) {
      throw new Error(`Network ${networkName} not configured in hardhat.config.js`);
    }
    
    // Get the deployer account
    const [deployer] = await ethers.getSigners();
    const trustedForwarder = networks[networkName].trustedForwarder;
    
    console.log(`Deployer address: ${deployer.address}`);
    const balance = await deployer.getBalance();
    console.log(`Deployer balance: ${ethers.utils.formatEther(balance)} MATIC`);
    
    // Check for sufficient balance
    if (balance.lt(ethers.utils.parseEther('0.1'))) {
      console.error(`Deployer has insufficient funds. Please add more MATIC to ${deployer.address}`);
      return;
    }

    // Compile contracts (Hardhat will handle this)
    console.log('Compiling contracts...');
    await hre.run('compile');
    
    // Get contract factories
    const WeddingWishesFactory = await ethers.getContractFactory("WeddingWishes");
    const WeddingWishesForwarderFactory = await ethers.getContractFactory("WeddingWishesForwarder");
    
    // Deploy WeddingWishes contract
    console.log('Deploying WeddingWishes contract...');
    const weddingWishes = await WeddingWishesFactory.deploy();
    await weddingWishes.deployed();
    
    console.log(`WeddingWishes deployed to: ${weddingWishes.address}`);
    
    // Deploy WeddingWishesForwarder contract
    console.log('Deploying WeddingWishesForwarder contract...');
    const weddingWishesForwarder = await WeddingWishesForwarderFactory.deploy(
      weddingWishes.address,
      trustedForwarder
    );
    await weddingWishesForwarder.deployed();
    
    console.log(`WeddingWishesForwarder deployed to: ${weddingWishesForwarder.address}`);
    
    // Configure forwarder as a trusted forwarder in the WeddingWishes contract
    console.log('Setting trusted forwarder...');
    const setTxn = await weddingWishes.setTrustedForwarder(weddingWishesForwarder.address, true);
    await setTxn.wait();
    console.log('Forwarder set as trusted in WeddingWishes contract');
    
    // Store contract addresses in .env file
    const envPath = path.join(__dirname, '../.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const updatedEnvContent = envContent
        .replace(
          new RegExp(`VITE_CONTRACT_ADDRESS_${networkName.toUpperCase()}=.*`),
          `VITE_CONTRACT_ADDRESS_${networkName.toUpperCase()}=${weddingWishes.address}`
        )
        .replace(
          new RegExp(`VITE_FORWARDER_ADDRESS_${networkName.toUpperCase()}=.*`),
          `VITE_FORWARDER_ADDRESS_${networkName.toUpperCase()}=${weddingWishesForwarder.address}`
        );
      
      fs.writeFileSync(envPath, updatedEnvContent);
      console.log('Updated .env file with contract addresses');
    } else {
      console.log(`Warning: .env file not found at ${envPath}`);
    }
    
    // Wait for a few blocks to make sure contracts are properly deployed
    console.log('Waiting for confirmation...');
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // Verify the contracts on Etherscan/Polygonscan if not on localhost
    if (networkName !== 'localhost' && process.env.POLYGONSCAN_API_KEY) {
      console.log('Verifying contracts on Polygonscan...');
      try {
        // Verify WeddingWishes
        await hre.run('verify:verify', {
          address: weddingWishes.address,
          contract: 'WeddingWishes.sol:WeddingWishes',
          constructorArguments: []
        });
        console.log('WeddingWishes verification complete!');
        
        // Verify WeddingWishesForwarder
        await hre.run('verify:verify', {
          address: weddingWishesForwarder.address,
          contract: 'WeddingWishesForwarder.sol:WeddingWishesForwarder',
          constructorArguments: [weddingWishes.address, trustedForwarder]
        });
        console.log('WeddingWishesForwarder verification complete!');
      } catch (verifyError) {
        console.log('Verification failed:', verifyError);
        console.log('You can try verifying manually using hardhat verify-contract task');
      }
    }
    
    return {
      weddingWishes: weddingWishes.address,
      weddingWishesForwarder: weddingWishesForwarder.address
    };
  } catch (error) {
    console.error(`Error deploying to ${networks[networkName].name}:`, error);
    return null;
  }
}

// Main function
async function main() {
  console.log('Wedding Contracts Deployment Script (Hardhat)');
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
    console.log('1. Verify contracts on Polygonscan (if verification failed)');
    console.log('2. Set up Biconomy Dashboard for the contracts');
    console.log('3. Test gasless transactions with the deployed contracts');
  }
}

// Execute the script
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
