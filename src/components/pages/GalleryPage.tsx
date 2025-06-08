import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

const GalleryPage: React.FC = () => {
  // Danh sách các danh mục
  const categories = ['Tất cả', 'Tiệc đính hôn', 'Chụp ngoại cảnh', 'Lễ đường'];
  const [activeCategory, setActiveCategory] = useState('Tất cả');
    // Dữ liệu mẫu cho ảnh
  const galleryImages: GalleryImage[] = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    src: `https://picsum.photos/800/600?random=${i + 20}`,
    alt: `Wedding image ${i + 1}`,
    category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
  }));

  // Lọc ảnh theo danh mục
  const filteredImages = activeCategory === 'Tất cả' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  // State cho lightbox
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <>
      <Section title="Album hình cưới" subtitle="Những khoảnh khắc hạnh phúc của chúng tôi">
        {/* Filter categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                activeCategory === category
                  ? 'bg-primary-500 text-gray-900'
                  : 'bg-gray-200 text-gray-700 hover:bg-primary-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
        
        {/* Image grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredImages.map((image) => (
            <motion.div
              layout
              key={image.id}
              className="relative overflow-hidden rounded-lg cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setSelectedImage(image)}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
              />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-white text-sm">{image.category}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative max-w-4xl max-h-[80vh] p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[75vh] object-contain"
              />
              
              <button
                className="absolute top-2 right-2 w-10 h-10 rounded-full bg-white/30 text-white flex items-center justify-center hover:bg-white/50"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </Section>
      
      <Section title="Chia sẻ ảnh của bạn" className="bg-primary-50">
        <div className="max-w-lg mx-auto text-center">
          <p className="mb-6 text-gray-600">
            Bạn đã chụp được những bức ảnh đẹp trong ngày cưới của chúng tôi? Hãy chia sẻ chúng bằng cách quét mã QR bên dưới hoặc nhấn vào liên kết.
          </p>
          
          <div className="bg-white p-6 rounded-lg shadow-md inline-block">
            {/* Placeholder for QR code */}
            <div className="w-48 h-48 bg-gray-200 mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-500">QR Code</span>
            </div>
            
            <p className="text-sm text-gray-600">Quét mã QR hoặc nhấn vào liên kết bên dưới</p>
            <a href="#" className="text-primary-700 hover:text-primary-900 mt-2 inline-block">
              shareweddingphotos.com/trinh-minh
            </a>
          </div>
        </div>
      </Section>
    </>
  );
};

export default GalleryPage;
