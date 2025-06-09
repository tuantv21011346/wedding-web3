import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../ui/Section';

interface TimelineImage {
  id: number;
  src: string;
  alt: string;
  description?: string;
}

interface TimelineMilestone {
  id: number;
  date: string;
  title: string;
  description: string;
  images: TimelineImage[];
  icon: string;
}

const TimelineGalleryPage: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<TimelineImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Chặn scroll khi popup mở và fix horizontal scroll
  useEffect(() => {
    if (selectedImage && selectedMilestone) {
      // Chặn scroll
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px'; // Không cần bù scrollbar trên mobile
    } else {
      // Khôi phục scroll
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }

    // Cleanup khi component unmount
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [selectedImage, selectedMilestone]);

  // Dữ liệu timeline từ hiện tại về quá khứ
  const timelineMilestones: TimelineMilestone[] = [
    {
      id: 1,
      date: "15 Tháng 8, 2025",
      title: "Ngày Cưới",
      description: "Ngày trọng đại của chúng tôi - lễ thành hôn chính thức",
      icon: "💒",
      images: Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        src: `https://picsum.photos/800/600?random=${i + 100}`,
        alt: `Wedding ceremony photo ${i + 1}`,
        description: `Khoảnh khắc đặc biệt trong lễ cưới ${i + 1}`
      }))
    },
    {
      id: 2,
      date: "10 Tháng 7, 2025",
      title: "Chụp Ảnh Cưới",
      description: "Buổi chụp ảnh cưới lãng mạn tại những địa điểm đẹp",
      icon: "📸",
      images: Array.from({ length: 8 }, (_, i) => ({
        id: i + 13,
        src: `https://picsum.photos/800/600?random=${i + 120}`,
        alt: `Pre-wedding photo ${i + 1}`,
        description: `Ảnh cưới tại địa điểm ${i + 1}`
      }))
    },
    {
      id: 3,
      date: "20 Tháng 5, 2025",
      title: "Lễ Đính Hôn",
      description: "Lễ đính hôn ấm cúng với gia đình và bạn bè thân thiết",
      icon: "💍",
      images: Array.from({ length: 10 }, (_, i) => ({
        id: i + 21,
        src: `https://picsum.photos/800/600?random=${i + 140}`,
        alt: `Engagement photo ${i + 1}`,
        description: `Khoảnh khắc đính hôn ${i + 1}`
      }))
    },
    {
      id: 4,
      date: "14 Tháng 2, 2024",
      title: "Valentine Đầu Tiên",
      description: "Valentine đầu tiên sau khi hẹn hò - ngày kỷ niệm đặc biệt",
      icon: "💝",
      images: Array.from({ length: 6 }, (_, i) => ({
        id: i + 31,
        src: `https://picsum.photos/800/600?random=${i + 160}`,
        alt: `Valentine photo ${i + 1}`,
        description: `Valentine lãng mạn ${i + 1}`
      }))
    },
    {
      id: 5,
      date: "12 Tháng 10, 2023",
      title: "Ngày Đầu Hẹn Hò",
      description: "Ngày chúng tôi chính thức bắt đầu mối quan hệ yêu đương",
      icon: "💕",
      images: Array.from({ length: 4 }, (_, i) => ({
        id: i + 37,
        src: `https://picsum.photos/800/600?random=${i + 180}`,
        alt: `First date photo ${i + 1}`,
        description: `Kỷ niệm hẹn hò đầu tiên ${i + 1}`
      }))
    },
    {
      id: 6,
      date: "25 Tháng 8, 2023",
      title: "Lần Đầu Gặp Gỡ",
      description: "Cuộc gặp gỡ định mệnh tại quán cà phê nhỏ",
      icon: "☕",
      images: Array.from({ length: 3 }, (_, i) => ({
        id: i + 41,
        src: `https://picsum.photos/800/600?random=${i + 200}`,
        alt: `First meeting photo ${i + 1}`,
        description: `Lần đầu gặp gỡ ${i + 1}`
      }))
    }
  ];

  const nextImage = () => {
    const currentMilestone = timelineMilestones.find(m => m.id === selectedMilestone);
    if (currentMilestone) {
      const nextIndex = (currentImageIndex + 1) % currentMilestone.images.length;
      setCurrentImageIndex(nextIndex);
      setSelectedImage(currentMilestone.images[nextIndex]);
    }
  };

  const prevImage = () => {
    const currentMilestone = timelineMilestones.find(m => m.id === selectedMilestone);
    if (currentMilestone) {
      const prevIndex = currentImageIndex === 0 ? currentMilestone.images.length - 1 : currentImageIndex - 1;
      setCurrentImageIndex(prevIndex);
      setSelectedImage(currentMilestone.images[prevIndex]);
    }
  };

  const openGallery = (milestone: TimelineMilestone) => {
    setSelectedMilestone(milestone.id);
    setCurrentImageIndex(0);
    setSelectedImage(milestone.images[0]);
  };

  return (
    <>
      <Section 
        title="Dòng Thời Gian Tình Yêu" 
        subtitle="Hành trình tình yêu của chúng tôi qua từng khoảnh khắc đáng nhớ"
      >
        <div className="max-w-4xl mx-auto px-4">
          {/* Timeline - Fixed container to prevent horizontal scroll */}          <div className="relative w-full overflow-hidden">            {/* Timeline line */}
            <div className="absolute left-6 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-pastel-purple-300 via-pastel-pink-300 to-pastel-purple-300"></div>
            
            {timelineMilestones.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                className={`relative flex items-center mb-8 md:mb-12 w-full ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 md:-translate-x-1/2 z-[5]">
                  <motion.div
                    className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full border-3 md:border-4 border-pastel-purple-300 flex items-center justify-center shadow-lg cursor-pointer hover:border-pastel-pink-400 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    onClick={() => openGallery(milestone)}
                  >
                    <span className="text-lg md:text-2xl">{milestone.icon}</span>
                  </motion.div>
                </div>

                {/* Content card - Prevent overflow */}
                <div className={`w-full md:w-5/12 ml-16 md:ml-0 pr-4 md:pr-0 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                  <motion.div
                    className="bg-white rounded-xl md:rounded-2xl shadow-lg p-3 md:p-6 border border-pastel-purple-100 hover:shadow-xl transition-shadow cursor-pointer"
                    whileHover={{ y: -5 }}
                    onClick={() => openGallery(milestone)}
                  >
                    <div className="text-xs md:text-sm text-pastel-purple-600 font-semibold mb-2">
                      {milestone.date}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
                      {milestone.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm text-pastel-pink-600 font-medium">
                        {milestone.images.length} ảnh
                      </span>
                      <motion.button
                        className="text-sm md:text-base text-pastel-purple-600 hover:text-pastel-purple-800 transition-colors"
                        whileHover={{ x: 5 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          openGallery(milestone);
                        }}
                      >
                        Xem ảnh →
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>      {/* Popup Slideshow for selected milestone */}
      <AnimatePresence>
        {selectedImage && selectedMilestone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-2 md:p-4 pt-24 md:pt-20"
            onClick={() => {
              setSelectedImage(null);
              setSelectedMilestone(null);
            }}
          >            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative w-full h-full max-w-sm md:max-w-6xl max-h-[80vh] bg-white rounded-lg md:rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const milestone = timelineMilestones.find(m => m.id === selectedMilestone);
                if (!milestone) return null;
                
                return (
                  <>                    {/* Header - Compact và không bị che bởi menu */}
                    <div className="bg-gradient-to-r from-pastel-purple-500 to-pastel-pink-500 text-white p-3 md:p-4 border-b-2 border-white/20 flex-shrink-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0 flex-1 pr-12">
                          <span className="text-lg md:text-xl">{milestone.icon}</span>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-sm md:text-lg font-bold truncate">{milestone.title}</h3>
                            <p className="text-pastel-purple-100 text-xs md:text-sm">{milestone.date}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Image display - Maximized */}
                    <div className="relative bg-gradient-to-b from-gray-900 to-black flex-1 flex items-center justify-center p-2 md:p-4">
                      <img 
                        src={selectedImage.src}
                        alt={selectedImage.alt}
                        className="max-w-full max-h-full object-contain shadow-2xl"
                      />
                      
                      {/* Navigation arrows */}
                      {milestone.images.length > 1 && (
                        <>
                          <button
                            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-800 hover:scale-110 transition-all shadow-lg"
                            onClick={prevImage}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <button
                            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-800 hover:scale-110 transition-all shadow-lg"
                            onClick={nextImage}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>                    {/* Image info and thumbnails - Compact */}
                    <div className="bg-white p-3 md:p-4 border-t border-gray-200 flex-shrink-0">
                      {/* Image description và số lượng ảnh */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 pr-3">
                          <h4 className="text-sm md:text-base font-medium text-gray-800 leading-tight">
                            {selectedImage.description}
                          </h4>
                        </div>
                        <div className="flex-shrink-0">
                          <span className="inline-block bg-gradient-to-r from-pastel-purple-500 to-pastel-pink-500 text-white text-xs md:text-sm px-3 py-1 rounded-full font-medium shadow-sm">
                            {currentImageIndex + 1} / {milestone.images.length}
                          </span>
                        </div>
                      </div>
                      
                      {/* Thumbnails */}
                      {milestone.images.length > 1 && (
                        <div className="flex gap-1.5 md:gap-2 overflow-x-auto pb-1">
                          {milestone.images.map((image, index) => (
                            <motion.button
                              key={image.id}
                              className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-md overflow-hidden border-2 transition-all ${
                                index === currentImageIndex 
                                  ? 'border-pastel-purple-400 shadow-md' 
                                  : 'border-gray-200 hover:border-pastel-purple-300'
                              }`}
                              onClick={() => {
                                setCurrentImageIndex(index);
                                setSelectedImage(image);
                              }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <img 
                                src={image.src} 
                                alt={image.alt}
                                className="w-full h-full object-cover"
                              />
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </div>                    {/* Close button - Positioned to avoid collision */}
                    <button
                      className="absolute top-3 md:top-4 right-3 md:right-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/80 hover:bg-black/95 text-white flex items-center justify-center transition-colors z-30 shadow-lg"
                      onClick={() => {
                        setSelectedImage(null);
                        setSelectedMilestone(null);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call to action */}
      <Section 
        title="Chia sẻ kỷ niệm của bạn" 
        className="bg-gradient-to-br from-pastel-pink-50 to-pastel-purple-50"
      >
        <div className="max-w-2xl mx-auto text-center px-4">
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Bạn có những khoảnh khắc đẹp cùng chúng tôi? Hãy chia sẻ để tạo nên bộ sưu tập kỷ niệm hoàn chỉnh!
          </p>
          
          <motion.div
            className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-pastel-purple-100"
            whileHover={{ y: -5 }}
          >
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-pastel-purple-100 to-pastel-pink-100 mx-auto mb-6 rounded-full flex items-center justify-center">
              <span className="text-3xl md:text-4xl">📱</span>
            </div>
            
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
              Upload ảnh qua QR Code
            </h3>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              Quét mã QR để upload ảnh của bạn vào timeline
            </p>
            
            <motion.button
              className="bg-gradient-to-r from-pastel-purple-500 to-pastel-pink-500 text-white px-6 md:px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all text-sm md:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Chia sẻ ảnh của bạn ❤️
            </motion.button>
          </motion.div>
        </div>
      </Section>
    </>
  );
};

export default TimelineGalleryPage;
