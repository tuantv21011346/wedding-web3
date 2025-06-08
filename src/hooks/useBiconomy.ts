import { useState, useEffect, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { ChainId } from '@biconomy/core-types';
import { useWeb3Context } from '../contexts/Web3Context';

/**
 * Custom hook to initialize and manage Biconomy SDK for meta-transactions
 */
export const useBiconomy = () => {
  const { address, isConnected } = useAccount();
  const { networkName } = useWeb3Context();
  
  const [biconomySmartAccount, setBiconomySmartAccount] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [smartAccountAddress, setSmartAccountAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Get the appropriate chain ID based on the network
  const getChainId = () => {
    return networkName === 'polygon' ? ChainId.POLYGON_MAINNET : ChainId.POLYGON_MUMBAI;
  };
  // Initialize Biconomy Smart Account
  const initBiconomyAccount = useCallback(async () => {
    try {
      if (!address || !isConnected) {
        setError('Please connect your wallet first');
        return null;
      }

      // Check if Biconomy API key is available
      const biconomyApiKey = import.meta.env.VITE_BICONOMY_API_KEY;
      if (!biconomyApiKey) {
        setError('Biconomy API key is not configured');
        return null;
      }

      setLoading(true);
      setError(null);

      // Dynamically import Biconomy modules to avoid type conflicts
      const { createSmartAccountClient } = await import('@biconomy/account');
      const { Bundler } = await import('@biconomy/bundler');
      const { BiconomyPaymaster } = await import('@biconomy/paymaster');
      const { DEFAULT_ENTRYPOINT_ADDRESS } = await import('@biconomy/account');

      // Get the provider from the connected wallet
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const signer = provider.getSigner();
      
      // Get the current chain ID
      const chainId = getChainId();

      // Initialize Bundler
      const bundler = new Bundler({
        bundlerUrl: `https://bundler.biconomy.io/api/v2/${chainId}/${biconomyApiKey}`,
        chainId,
        entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
      });      // Initialize Paymaster
      const paymaster = new BiconomyPaymaster({
        paymasterUrl: `https://paymaster.biconomy.io/api/v1/${chainId}/${biconomyApiKey}`,
      });

      // Create the smart account using any type to avoid type conflicts
      const smartAccount = await createSmartAccountClient({
        signer,
        chainId,
        bundler: bundler as any,
        paymaster: paymaster as any,
        entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
      });
      
      const saAddress = await smartAccount.getAccountAddress();
      
      setBiconomySmartAccount(smartAccount);
      setSmartAccountAddress(saAddress);
      
      console.log('Biconomy Smart Account initialized at:', saAddress);
      
      return smartAccount;
    } catch (err: any) {
      console.error('Error initializing Biconomy:', err);
      setError(`Failed to initialize Biconomy: ${err.message}`);
      return null;
    } finally {
      setLoading(false);
    }
  }, [address, isConnected, networkName]);

  // Send a gasless transaction using Biconomy
  const sendGaslessTransaction = async (
    contractAddress: string, 
    contractAbi: any[], 
    method: string, 
    params: any[]
  ) => {
    try {
      let smartAccount = biconomySmartAccount;
      
      if (!smartAccount) {
        smartAccount = await initBiconomyAccount();
      }
      
      if (!smartAccount) {
        throw new Error('Biconomy Smart Account is not initialized');
      }

      // Dynamically import PaymasterMode
      const { PaymasterMode } = await import('@biconomy/account');

      // Create the contract interface and encode the function call
      const contractInterface = new ethers.utils.Interface(contractAbi);
      const data = contractInterface.encodeFunctionData(method, params);

      // Prepare the transaction
      const tx = {
        to: contractAddress,
        data,
        value: "0",
      };

      // Build and send the user operation with sponsored (gasless) mode
      const userOpResponse = await smartAccount.sendTransaction(tx, {
        paymasterServiceData: { mode: PaymasterMode.SPONSORED },
      });
      
      // Wait for the transaction receipt
      const transactionDetails = await userOpResponse.waitForTxHash();
      
      return {
        transactionHash: transactionDetails.transactionHash,
        receipt: transactionDetails
      };
    } catch (err: any) {
      console.error('Error sending gasless transaction:', err);
      throw new Error(`Failed to send transaction: ${err.message}`);
    }
  };

  // Use effect to initialize Biconomy when wallet is connected
  useEffect(() => {
    if (isConnected && address) {
      initBiconomyAccount();
    }
  }, [isConnected, address, initBiconomyAccount]);

  return {
    biconomySmartAccount,
    smartAccountAddress,
    loading,
    error,
    initBiconomyAccount,
    sendGaslessTransaction,
  };
};
