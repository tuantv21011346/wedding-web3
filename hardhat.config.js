require('dotenv').config();
const { task } = require("hardhat/config");

require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0000000000000000000000000000000000000000000000000000000000000000";
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {},
    mumbai: {
      url: process.env.MUMBAI_RPC_URL || "https://rpc-mumbai.maticvigil.com",
      accounts: [PRIVATE_KEY],
      chainId: 80001,
    },
    polygon: {
      url: process.env.POLYGON_RPC_URL || "https://polygon-rpc.com",
      accounts: [PRIVATE_KEY],
      chainId: 137,
    },
  },
  etherscan: {
    apiKey: {
      polygon: POLYGONSCAN_API_KEY,
      polygonMumbai: POLYGONSCAN_API_KEY,
    },
  },
  paths: {
    sources: "./src/contracts",
    artifacts: "./src/artifacts",
  },
};

// Custom tasks
task("verify-contract", "Verifies contract on Polygonscan")
  .addParam("address", "The contract's address")
  .addParam("contract", "The contract's name")
  .addOptionalParam("args", "Constructor arguments (comma separated)")
  .setAction(async (taskArgs, hre) => {
    const contractAddress = taskArgs.address;
    const contractName = taskArgs.contract;
    
    let constructorArgs = [];
    if (taskArgs.args) {
      constructorArgs = taskArgs.args.split(',');
    }
    
    await hre.run("verify:verify", {
      address: contractAddress,
      contract: `${contractName}.sol:${contractName}`,
      constructorArguments: constructorArgs,
    });
  });
