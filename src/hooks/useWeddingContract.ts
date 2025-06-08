import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Contract } from 'ethers';
import { providers } from 'ethers';
import { WEDDING_WISHES_ABI, CONTRACT_ADDRESSES } from '../contracts/contract-config';
import type { Wish } from '../contracts/contract-config';
import { useBiconomy } from './useBiconomy';

/**
 * Custom hook để đọc danh sách lời chúc từ smart contract
 */
export const useWeddingWishes = (networkName: 'polygon' | 'mumbai' = 'polygon') => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const contractAddress = networkName === 'polygon' 
    ? CONTRACT_ADDRESSES.polygon.weddingWishes 
    : CONTRACT_ADDRESSES.mumbai.weddingWishes;
    // Cập nhật danh sách lời chúc
  const fetchWishes = async () => {    try {
      setLoading(true);
      setError(null);
      
      // Create a simple provider without ENS support
      const rpcUrl = networkName === 'polygon' 
        ? 'https://polygon-rpc.com'
        : 'https://rpc-mumbai.maticvigil.com';
      
      const provider = new providers.StaticJsonRpcProvider(rpcUrl);
      
      const contract = new Contract(contractAddress, WEDDING_WISHES_ABI, provider);
      
      // Gọi hàm getAllWishes từ smart contract
      const result = await contract.getAllWishes();
      
      // Chuyển đổi kết quả thành mảng các đối tượng Wish
      const formattedWishes = result.map((wish: any) => ({
        sender: wish.sender,
        message: wish.message,
        timestamp: Number(wish.timestamp),
        senderName: wish.senderName,
        imageIpfsHash: wish.imageIpfsHash
      }));
      
      // Sắp xếp lời chúc theo thời gian giảm dần (mới nhất lên đầu)
      formattedWishes.sort((a: Wish, b: Wish) => b.timestamp - a.timestamp);
      
      setWishes(formattedWishes);
    } catch (err: any) {
      console.error('Error fetching wishes:', err);
      setError('Could not fetch wishes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  // Lấy danh sách lời chúc khi hook được khởi tạo
  useEffect(() => {
    // Chỉ gọi API khi có địa chỉ contract thật
    if (contractAddress !== '0x0000000000000000000000000000000000000000') {
      fetchWishes();
    }
    
    // Thiết lập interval để tự động cập nhật danh sách lời chúc
    const intervalId = setInterval(fetchWishes, 30000); // Cập nhật mỗi 30 giây
    
    return () => clearInterval(intervalId);
  }, [contractAddress]);
  
  return {
    wishes,
    loading, 
    error,
    refreshWishes: fetchWishes
  };
};

/**
 * Custom hook để gửi lời chúc lên blockchain
 */
export const useSendWish = (networkName: 'polygon' | 'mumbai' = 'polygon') => {
  const { isConnected } = useAccount();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { sendGaslessTransaction, biconomySmartAccount } = useBiconomy();
  
  const contractAddress = networkName === 'polygon' 
    ? CONTRACT_ADDRESSES.polygon.weddingWishes 
    : CONTRACT_ADDRESSES.mumbai.weddingWishes;

  // Fallback function to send transaction directly (with gas)
  const sendTransactionWithGas = async (message: string, senderName: string, imageIpfsHash: string = '') => {
    try {
      // Get provider and signer from connected wallet
      const provider = new providers.Web3Provider(window.ethereum as any);
      const signer = provider.getSigner();
      
      // Create contract instance
      const contract = new Contract(contractAddress, WEDDING_WISHES_ABI, signer);
      
      // Send transaction
      const tx = await contract.addWish(message, senderName, imageIpfsHash);
      const receipt = await tx.wait();
      
      return {
        transactionHash: receipt.transactionHash,
        receipt
      };
    } catch (err) {
      throw err;
    }
  };

  // Hàm để gửi lời chúc lên blockchain
  const sendWish = async (message: string, senderName: string, imageIpfsHash: string = '') => {
    // Reset trạng thái
    setError(null);
    setSuccess(false);
    
    if (!isConnected) {
      setError('Please connect your wallet first');
      return false;
    }
    
    if (!message || !senderName) {
      setError('Message and name cannot be empty');
      return false;
    }
      try {
      setIsSubmitting(true);
      
      // Try gasless transaction first if Biconomy is available
      if (biconomySmartAccount) {
        try {
          const result = await sendGaslessTransaction(
            contractAddress,
            WEDDING_WISHES_ABI,
            'addWish',
            [message, senderName, imageIpfsHash]
          );
          console.log('Gasless transaction sent:', result.transactionHash);
          setSuccess(true);
          return true;
        } catch (gaslessError) {
          console.warn('Gasless transaction failed, falling back to regular transaction:', gaslessError);
        }
      }
      
      // Fallback to regular transaction with gas
      console.log('Using regular transaction with gas...');
      const result = await sendTransactionWithGas(message, senderName, imageIpfsHash);
      console.log('Transaction sent:', result.transactionHash);
      setSuccess(true);
      return true;
    } catch (err: any) {
      console.error('Error sending wish:', err);
      setError(err.message || 'Could not send wish. Please try again later.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    sendWish,
    isSubmitting,
    error,
    success
  };
};
