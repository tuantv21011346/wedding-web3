import { useCallback } from 'react';
import { create } from 'ipfs-http-client';

// Cấu hình IPFS (sử dụng Infura IPFS gateway)
const projectId = import.meta.env.VITE_INFURA_IPFS_PROJECT_ID || ''; 
const projectSecret = import.meta.env.VITE_INFURA_IPFS_PROJECT_SECRET || '';

// Tạo basic auth header
const auth = 'Basic ' + btoa(projectId + ':' + projectSecret);

// Khởi tạo IPFS client
const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

/**
 * Custom hook để tương tác với IPFS
 */
export const useIPFS = () => {
  /**
   * Upload file lên IPFS
   */
  const uploadToIPFS = useCallback(async (file: File) => {
    try {
      // Chuyển đổi file thành array buffer
      const buffer = await file.arrayBuffer();
      
      // Upload lên IPFS
      const result = await client.add(
        buffer,
        {
          progress: (prog: number) => console.log(`Upload progress: ${prog}`)
        }
      );
      
      // Trả về IPFS hash (CID)
      return {
        cid: result.path,
        url: `https://ipfs.io/ipfs/${result.path}`
      };
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      throw new Error('Failed to upload to IPFS');
    }
  }, []);

  /**
   * Upload dữ liệu JSON lên IPFS
   */
  const uploadJSONToIPFS = useCallback(async (data: any) => {
    try {
      // Chuyển đổi JSON thành string
      const jsonData = JSON.stringify(data);
      
      // Upload lên IPFS
      const result = await client.add(jsonData);
      
      // Trả về IPFS hash (CID)
      return {
        cid: result.path,
        url: `https://ipfs.io/ipfs/${result.path}`
      };
    } catch (error) {
      console.error('Error uploading JSON to IPFS:', error);
      throw new Error('Failed to upload JSON to IPFS');
    }
  }, []);

  return {
    uploadToIPFS,
    uploadJSONToIPFS
  };
};
