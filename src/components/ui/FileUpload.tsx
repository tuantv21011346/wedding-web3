import React, { useState } from 'react';
import Button from './Button';

interface FileUploadProps {
  onChange: (file: File) => void;
  label?: string;
  accept?: string;
  error?: string;
  maxSize?: number; // in bytes
}

const FileUpload: React.FC<FileUploadProps> = ({
  onChange,
  label = 'Chọn tệp',
  accept = 'image/*',
  error,
  maxSize = 5 * 1024 * 1024, // 5MB default
}) => {
  const [fileName, setFileName] = useState<string>('');
  const [preview, setPreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) {
      return;
    }
    
    // Reset errors
    setFileError(null);
    
    // Check file size
    if (file.size > maxSize) {
      setFileError(`Tệp quá lớn. Kích thước tối đa là ${maxSize / (1024 * 1024)}MB.`);
      return;
    }
    
    // Update file name
    setFileName(file.name);
    
    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
    
    // Call onChange prop
    onChange(file);
  };
  
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 hover:bg-gray-50 transition-colors">
        <input
          type="file"
          className="hidden"
          id="file-upload"
          accept={accept}
          onChange={handleFileChange}
        />
        
        {preview ? (
          <div className="mb-4">
            <img
              src={preview}
              alt="Preview"
              className="max-h-40 rounded-md"
            />
          </div>
        ) : (
          <svg
            className="w-12 h-12 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        )}
        
        <label htmlFor="file-upload">
          <Button type="button" variant="outline">
            {fileName || 'Chọn tệp'}
          </Button>
        </label>
        
        {(fileError || error) && (
          <p className="mt-2 text-sm text-red-600">
            {fileError || error}
          </p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
