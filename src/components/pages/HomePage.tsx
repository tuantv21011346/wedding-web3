import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import { useCountdown } from '../../hooks/useCountdown';

const HomePage: React.FC = () => {
  // Ngày cưới - 15 tháng 8, 2025, 10:00 AM - sử dụng useMemo để tránh tạo lại Date object
  const weddingDate = useMemo(() => new Date('2025-08-15T10:00:00+07:00'), []);
  const countdown = useCountdown(weddingDate);

  return (
    <>      {/* Hero Section */}
      <motion.div 
        className="hero-section relative flex items-center justify-center overflow-hidden -mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >{/* Background Image with Multiple Layers */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-pastel-purple-100 to-pastel-pink-100">          <img 
            src="/images/IMG_2782.JPG"
            alt="Wedding background"
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{
              filter: 'brightness(0.6) contrast(1.1)'
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50"></div>
          
          {/* Decorative Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-pastel-purple-900/20 via-transparent to-pastel-pink-900/20"></div>
        </div>

        {/* Floating Decorative Elements - Hidden on mobile for better performance */}
        <motion.div 
          className="absolute top-20 left-4 md:top-32 md:left-20 w-16 h-16 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-pastel-pink-400/30 to-pastel-purple-400/30 backdrop-blur-sm border border-white/20 hidden sm:block"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div 
          className="absolute top-32 right-4 md:top-48 md:right-24 w-12 h-12 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-pastel-purple-400/25 to-pastel-pink-400/25 backdrop-blur-sm border border-white/15 hidden sm:block"
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -8, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        <motion.div 
          className="absolute bottom-20 left-4 md:bottom-40 md:left-16 w-10 h-10 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-white/20 to-pastel-pink-300/30 backdrop-blur-sm border border-white/20 hidden sm:block"
          animate={{ 
            y: [0, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
          {/* Pre-title */}
          <motion.div
            className="mb-4 md:mb-6"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 sm:px-6 sm:py-3 text-sm md:text-base font-medium">
              <span className="text-base sm:text-lg">💕</span>
              <span>Save the Date</span>
            </div>
          </motion.div>

          <motion.h3
            className="font-script text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-3 md:mb-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Chúng tôi sắp kết hôn
          </motion.h3>
          
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-heading mb-4 md:mb-8 leading-tight px-2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-white via-pastel-pink-100 to-white bg-clip-text text-transparent block">
              Tuyến & Minh
            </span>
          </motion.h1>
          
          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-6 md:mb-12 font-light max-w-4xl mx-auto leading-relaxed px-2"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <span className="block sm:inline">15 Tháng 8, 2025</span>
            <span className="hidden sm:inline mx-2 text-pastel-pink-200">•</span>
            <span className="block sm:inline mt-1 sm:mt-0">TP. Bắc Giang</span>
          </motion.p>
          
          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >            <Button className="mobile-button w-full sm:w-auto bg-white text-pastel-purple-800 hover:bg-pastel-pink-50 border-2 border-white shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold rounded-full">
              <Link to="/couple" className="flex items-center justify-center gap-2">
                <span>Khám phá</span>
                <span className="button-emoji">✨</span>
              </Link>
            </Button>
            
            <Button className="mobile-button w-full sm:w-auto bg-transparent text-white border-2 border-white/50 hover:bg-white/10 hover:border-white shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold rounded-full backdrop-blur-sm">
              <Link to="/timeline-gallery" className="flex items-center justify-center gap-2">
                <span>Xem ảnh</span>
                <span className="button-emoji">📸</span>
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator - Hidden on mobile */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden md:block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div 
            className="flex flex-col items-center text-white/80 cursor-pointer group"
            animate={{ y: [0, 8, 0] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <span className="text-sm font-medium mb-2 group-hover:text-white transition-colors">Cuộn xuống</span>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center group-hover:border-white transition-colors">
              <motion.div 
                className="w-1 h-3 bg-white/60 rounded-full mt-2 group-hover:bg-white"
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Countdown Section */}
      <Section title={countdown.isExpired ? "Đám cưới đã diễn ra!" : "Đếm ngược đến ngày trọng đại"} className="bg-gradient-to-br from-pastel-purple-50 to-pastel-pink-50">
        {countdown.isExpired ? (
          <div className="text-center">
            <motion.div
              className="text-2xl md:text-3xl font-bold text-pastel-purple-800"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              🎉 Chúc mừng hạnh phúc! 🎉
            </motion.div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {[
              { label: 'Ngày', value: countdown.days },
              { label: 'Giờ', value: countdown.hours },
              { label: 'Phút', value: countdown.minutes },
              { label: 'Giây', value: countdown.seconds }
            ].map((item, index) => (
              <motion.div 
                key={item.label}
                className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-lg shadow-lg border border-pastel-pink-100 flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300"
                initial={{ scale: 0, rotate: -10 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-pastel-pink-600 to-pastel-purple-600 bg-clip-text text-transparent">
                  {item.value.toString().padStart(2, '0')}
                </span>
                <span className="text-sm text-gray-500">{item.label}</span>
              </motion.div>
            ))}
          </div>
        )}
      </Section>

      {/* Story Section */}
      <Section title="Câu chuyện tình yêu" subtitle="Hành trình đẹp đẽ của chúng tôi từ khi gặp nhau đến ngày hôn lễ">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 md:gap-12">
            {[
              {
                date: 'Tháng 5, 2020',
                title: '💫 Lần đầu gặp gỡ',
                description: 'Chúng tôi gặp nhau tại một buổi hội thảo về blockchain. Có thể nói đó là định mệnh khi hai trái tim cùng đam mê công nghệ đã tìm thấy nhau.',
                emoji: '💫',
                color: 'from-pink-400 to-rose-500'
              },
              {
                date: 'Tháng 8, 2021',
                title: '☕ Hẹn hò đầu tiên',
                description: 'Buổi hẹn hò đầu tiên tại một quán cà phê nhỏ ở quận 1. Những cuộc trò chuyện về tương lai và ước mơ đã kéo dài đến tận đêm muộn.',
                emoji: '☕',
                color: 'from-amber-400 to-orange-500'
              },
              {
                date: 'Tháng 12, 2023',
                title: '💍 Lời cầu hôn',
                description: 'Màn cầu hôn lãng mạn tại bãi biển Vũng Tàu dưới ánh hoàng hôn. Khoảnh khắc "Em có muốn làm vợ anh không?" sẽ mãi được ghi nhớ.',
                emoji: '💍',
                color: 'from-purple-400 to-indigo-500'
              },
              {
                date: 'Tháng 8, 2025',
                title: '💒 Ngày cưới',
                description: 'Chúng tôi sẽ chính thức trở thành vợ chồng trong một lễ cưới đặc biệt với sự chứng kiến của blockchain và tình yêu vĩnh cửu.',
                emoji: '💒',
                color: 'from-emerald-400 to-teal-500'
              }
            ].map((item, index) => (
              <motion.div 
                key={item.title}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                  {/* Emoji Circle */}
                  <motion.div 
                    className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-3xl md:text-4xl shadow-xl`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {item.emoji}
                  </motion.div>
                  
                  {/* Content Card */}
                  <motion.div 
                    className="flex-1 bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-0">
                        {item.title}
                      </h3>
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${item.color} text-white shadow-lg`}>
                        {item.date}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
                
                {/* Connecting Line (except for last item) */}
                {index < 3 && (
                  <div className="flex justify-center my-8">
                    <div className="w-px h-16 bg-gradient-to-b from-gray-300 to-transparent"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Gallery Preview */}
      <Section title="Album hình cưới" subtitle="Những khoảnh khắc đẹp nhất được lưu giữ mãi mãi" className="bg-gradient-to-br from-pastel-pink-50 to-pastel-purple-50">
        <div className="max-w-6xl mx-auto">
          {/* Featured Image */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="/images/IMG_2782.JPG"
                alt="Ảnh cưới chính"
                className="w-full h-80 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">Khoảnh khắc hạnh phúc</h3>
                <p className="text-white/90 text-lg">Tình yêu đích thực được ghi lại trong từng khoảnh khắc</p>
              </div>
            </div>
          </motion.div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { 
                src: `https://picsum.photos/400/500?random=41`, 
                title: "Pre-wedding", 
                subtitle: "Ảnh cưới trước hôn lễ",
                aspect: "h-80"
              },
              { 
                src: `https://picsum.photos/400/400?random=42`, 
                title: "Engagement", 
                subtitle: "Lễ đính hôn",
                aspect: "h-64"
              },
              { 
                src: `https://picsum.photos/400/600?random=43`, 
                title: "Love Story", 
                subtitle: "Câu chuyện tình yêu",
                aspect: "h-96"
              },
              { 
                src: `https://picsum.photos/400/400?random=44`, 
                title: "Studio", 
                subtitle: "Chụp ảnh studio",
                aspect: "h-64"
              },
              { 
                src: `https://picsum.photos/400/500?random=45`, 
                title: "Outdoor", 
                subtitle: "Ngoại cảnh",
                aspect: "h-80"
              },
              { 
                src: `https://picsum.photos/400/400?random=46`, 
                title: "Moments", 
                subtitle: "Khoảnh khắc đẹp",
                aspect: "h-64"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
              >
                <div className={`relative ${item.aspect} overflow-hidden bg-gradient-to-br from-pastel-pink-100 to-pastel-purple-100`}>
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Text overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-sm text-white/90">{item.subtitle}</p>
                  </div>
                  
                  {/* Decorative corner */}
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="text-center sm:text-left">
                <h4 className="text-xl font-bold text-gray-800 mb-2">Khám phá thêm nhiều ảnh đẹp</h4>
                <p className="text-gray-600">Xem toàn bộ bộ sưu tập ảnh cưới của chúng tôi theo dòng thời gian</p>
              </div>
              <Button className="flex-shrink-0 bg-gradient-to-r from-pastel-pink-500 to-pastel-purple-500 hover:from-pastel-pink-600 hover:to-pastel-purple-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Link to="/timeline-gallery" className="flex items-center gap-2">
                  <span>Xem tất cả ảnh</span>
                  <span className="text-lg">📸</span>
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Web3 Integration */}
      <Section title="Gửi lời chúc trên blockchain" subtitle="Lưu giữ lời chúc của bạn vĩnh viễn trên công nghệ blockchain">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div className="text-center md:text-left">
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-4">
                    <span className="text-lg">🔗</span>
                    <span>Web3 Technology</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    Lời chúc bất tử
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Sử dụng công nghệ blockchain Polygon để lưu trữ lời chúc vĩnh viễn. 
                    Không cần lo lắng về phí gas - chúng tôi sẽ tài trợ giao dịch cho bạn!
                  </p>
                </motion.div>

                {/* Features */}
                <motion.div 
                  className="space-y-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {[
                    { icon: '🔒', text: 'Bảo mật tuyệt đối' },
                    { icon: '♾️', text: 'Lưu trữ vĩnh viễn' },
                    { icon: '💳', text: 'Miễn phí gas fee' }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-2xl">{feature.icon}</span>
                      <span className="text-gray-700 font-medium">{feature.text}</span>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <Link to="/wishes" className="flex items-center gap-3">
                      <span className="text-lg">💌</span>
                      <span className="font-semibold">Gửi lời chúc ngay</span>
                    </Link>
                  </Button>
                </motion.div>
              </div>

              {/* Right Visual */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative">
                  {/* Main blockchain visual */}
                  <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl p-8 text-white text-center shadow-2xl">
                    <div className="text-4xl mb-4">🔗</div>
                    <h4 className="text-xl font-bold mb-2">Blockchain</h4>
                    <p className="text-purple-100 text-sm">Polygon Network</p>
                  </div>
                  
                  {/* Floating elements */}
                  <motion.div 
                    className="absolute -top-4 -right-4 bg-yellow-400 rounded-full w-12 h-12 flex items-center justify-center text-xl shadow-lg"
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    💝
                  </motion.div>
                  
                  <motion.div 
                    className="absolute -bottom-4 -left-4 bg-green-400 rounded-full w-10 h-10 flex items-center justify-center text-lg shadow-lg"
                    animate={{ 
                      y: [0, 10, 0],
                      rotate: [0, -5, 5, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  >
                    ✨
                  </motion.div>
                  
                  <motion.div 
                    className="absolute top-1/2 -left-8 bg-pink-400 rounded-full w-8 h-8 flex items-center justify-center text-sm shadow-lg"
                    animate={{ 
                      x: [0, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  >
                    💕
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default HomePage;
