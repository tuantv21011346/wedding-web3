import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { http, createConfig, WagmiProvider } from 'wagmi';
import { polygon, polygonMumbai } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  RainbowKitProvider,
  connectorsForWallets,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  rainbowWallet,
  trustWallet,
} from '@rainbow-me/rainbowkit/wallets';
import '@rainbow-me/rainbowkit/styles.css';

// Create React Query client
const queryClient = new QueryClient();

// App configuration
const APP_NAME = 'MITU';
const projectId: string = import.meta.env.VITE_WALLET_CONNECT_ID ?? 'yourWalletConnectIdHere';

// ✅ cấu hình mạng và RPC provider
const chains = [polygon, polygonMumbai] as const;

const transports = {
  [polygon.id]: http(import.meta.env.VITE_POLYGON_RPC_URL ?? 'https://polygon-rpc.com'),
  [polygonMumbai.id]: http(import.meta.env.VITE_MUMBAI_RPC_URL ?? 'https://rpc-mumbai.maticvigil.com'),
};

// ✅ cấu hình connector với factory functions
const connectors = connectorsForWallets(
 [
    {
      groupName: 'Recommended',
      wallets: [
        metaMaskWallet,
        coinbaseWallet,
        walletConnectWallet,
        rainbowWallet,
        trustWallet,
      ],
    },
  ],
  {
    appName: APP_NAME,
    projectId,
  }
);

// ✅ cấu hình wagmi
const config = createConfig({
  chains,
  connectors,
  transports,
});

// Create context for custom web3 state
interface Web3ContextProps {
  isTestnet: boolean;
  setIsTestnet: (isTestnet: boolean) => void;
  networkName: 'polygon' | 'mumbai';
}

const Web3Context = createContext<Web3ContextProps | undefined>(undefined);

export const useWeb3Context = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3Context must be used within a Web3Provider');
  }
  return context;
};

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [isTestnet, setIsTestnet] = useState(false);
  
  const networkName = isTestnet ? 'mumbai' as const : 'polygon' as const;
  
  const value = {
    isTestnet,
    setIsTestnet,
    networkName,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider 
          theme={darkTheme({
            accentColor: '#E1D7CB',
            accentColorForeground: '#333',
            borderRadius: 'medium',
            fontStack: 'system',
          })}
          modalSize="compact"
        >
          <Web3Context.Provider value={value}>
            {children}
          </Web3Context.Provider>
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
};
