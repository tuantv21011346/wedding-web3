import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import FileUpload from '../ui/FileUpload';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useWeb3Context } from '../../contexts/Web3Context';
import { useSendWish, useWeddingWishes } from '../../hooks/useWeddingContract';
import { useNotification } from '../../hooks/useNotification';

const WishesPage: React.FC = () => {
  const { isConnected } = useAccount();
  const { networkName } = useWeb3Context();
  const { wishes, loading, error: wishesError, refreshWishes } = useWeddingWishes(networkName);
  const { sendWish, isSubmitting, error: sendError, success } = useSendWish(networkName);
  const { showNotification } = useNotification();
  
  // Form states
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formErrors, setFormErrors] = useState({
    name: '',
    message: '',
  });
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    let valid = true;
    const errors = {
      name: '',
      message: '',
    };
    
    if (!name.trim()) {
      errors.name = 'Vui lòng nhập tên của bạn';
      valid = false;
    }
    
    if (!message.trim()) {
      errors.message = 'Vui lòng nhập lời chúc';
      valid = false;
    }
    
    setFormErrors(errors);
    
    if (!valid) return;
    
  // Process image if provided (upload to IPFS)
    let imageIpfsHash = '';
    if (imageFile) {
      try {
        const { useIPFS } = require('../../hooks/useIPFS');
        const { uploadToIPFS } = useIPFS();
        const result = await uploadToIPFS(imageFile);
        imageIpfsHash = result.cid;
      } catch (error) {
        console.error('Failed to upload image to IPFS:', error);
      }
    }
      // Send wish to blockchain
    try {
      showNotification('Đang gửi lời chúc...', 'info');
      const success = await sendWish(message, name, imageIpfsHash);
      
      if (success) {
        showNotification('Lời chúc đã được gửi thành công!', 'success');
        // Reset form
        setName('');
        setMessage('');
        setImageFile(null);
        
        // Refresh wishes list
        refreshWishes();
      }
    } catch (error) {
      showNotification('Có lỗi xảy ra khi gửi lời chúc', 'error');
    }
  };

  return (
    <>
      <Section title="Lời chúc" subtitle="Gửi lời chúc của bạn đến cặp đôi">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Form section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <h3 className="text-xl font-medium text-gray-900 mb-6">Gửi lời chúc</h3>
              
              {isConnected ? (
                <form onSubmit={handleSubmit}>
                  <Input
                    label="Tên của bạn"
                    placeholder="Nhập tên của bạn"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={formErrors.name}
                    required
                  />
                  
                  <TextArea
                    label="Lời chúc"
                    placeholder="Viết lời chúc của bạn tại đây..."
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    error={formErrors.message}
                    required
                  />
                  
                  <FileUpload
                    label="Thêm hình ảnh (không bắt buộc)"
                    onChange={(file) => setImageFile(file)}
                    accept="image/*"
                    maxSize={3 * 1024 * 1024} // 3MB
                  />
                  
                  {sendError && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
                      {sendError}
                    </div>
                  )}
                  
                  {success && (
                    <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md">
                      Lời chúc của bạn đã được gửi thành công!
                    </div>
                  )}
                  
                  <Button
                    type="submit"
                    fullWidth
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                  >
                    Gửi lời chúc
                  </Button>
                  
                  <div className="mt-4 text-center text-sm text-gray-500">
                    <p>Lời chúc của bạn sẽ được lưu trữ vĩnh viễn trên blockchain Polygon.</p>
                    <p className="mt-1">Bạn không phải trả phí gas - chúng tôi sẽ lo phần đó!</p>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-600 mb-6">
                    Vui lòng kết nối ví của bạn để gửi lời chúc
                  </p>
                  <div className="flex justify-center">
                    <ConnectButton showBalance={false} />
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
          
          {/* Wishes display */}
          <div>
            <h3 className="text-xl font-medium text-gray-900 mb-6">Lời chúc từ khách mời</h3>
            
            {loading && <p className="text-gray-500">Đang tải lời chúc...</p>}
            
            {wishesError && (
              <div className="p-3 bg-red-50 text-red-700 rounded-md mb-4">
                {wishesError}
              </div>
            )}
            
            {!loading && wishes.length === 0 && (
              <p className="text-gray-500">Chưa có lời chúc nào. Hãy là người đầu tiên!</p>
            )}
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {wishes.map((wish, index) => (
                <motion.div
                  key={`${wish.sender}-${wish.timestamp}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card>
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-pastel-purple-200 flex-shrink-0 flex items-center justify-center mr-4">
                        {wish.imageIpfsHash ? (
                          <img
                            src={`https://ipfs.io/ipfs/${wish.imageIpfsHash}`}
                            alt={`${wish.senderName}`}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-xl text-pastel-purple-700">
                            {wish.senderName.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-gray-900">{wish.senderName}</h4>
                          <span className="text-xs text-gray-500">
                            {new Date(wish.timestamp * 1000).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700 whitespace-pre-line">{wish.message}</p>
                        
                        {/* Shortened wallet address */}
                        <div className="mt-2 text-xs text-gray-500">
                          {`${wish.sender.substring(0, 6)}...${wish.sender.substring(38)}`}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>
      
      <Section title="Blockchain là gì?" className="bg-pastel-purple-50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-600 mb-6">
            Blockchain là công nghệ lưu trữ phi tập trung, cho phép lưu trữ dữ liệu một cách an toàn và vĩnh viễn.
            Lời chúc của bạn sẽ được lưu trữ trên mạng Polygon - một blockchain tương thích với Ethereum
            nhưng nhanh hơn và tiết kiệm phí giao dịch.
          </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pastel-purple-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-pastel-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">An toàn</h3>
              <p className="text-gray-600">
                Dữ liệu trên blockchain được mã hóa và bảo mật cao, không thể thay đổi sau khi đã xác nhận.
              </p>
            </Card>
              <Card className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pastel-purple-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-pastel-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 22h14a2 2 0 002-2v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7a2 2 0 002 2zm11-2H8v-7h8v7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Vĩnh viễn</h3>
              <p className="text-gray-600">
                Lời chúc của bạn sẽ được lưu trữ vĩnh viễn trên blockchain và không thể bị xóa bỏ.
              </p>
            </Card>
              <Card className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pastel-purple-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-pastel-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Miễn phí</h3>
              <p className="text-gray-600">
                Chúng tôi chi trả phí giao dịch (gas) cho bạn, vì vậy việc gửi lời chúc hoàn toàn miễn phí.
              </p>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
};

export default WishesPage;
