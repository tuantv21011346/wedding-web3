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
    <>
      {/* Hero Section */}
      <motion.div 
        className="relative h-screen min-h-[600px] flex items-center justify-center bg-gray-100 overflow-hidden -mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/IMG_2782.JPG')",
            backgroundPosition: 'center',
            filter: 'brightness(0.7)'
          }}
        ></div>
        
        {/* Content */}
        <div className="z-10 text-center text-white">
          <motion.h3
            className="font-script text-2xl md:text-3xl mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Chúng tôi sắp kết hôn
          </motion.h3>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-serif mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Tuyến & Minh
          </motion.h1>
          
          <motion.p
            className="text-xl mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            6 Tháng 6, 2025 • TP. Bắc Giang
          </motion.p>
          
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >            <Button className="px-8 py-3 bg-white text-pastel-purple-800 hover:bg-pastel-pink-50 border border-pastel-pink-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <Link to="/couple">Khám phá</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>      {/* Countdown Section */}
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
              >                <span className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-pastel-pink-600 to-pastel-purple-600 bg-clip-text text-transparent">
                  {item.value.toString().padStart(2, '0')}
                </span>
                <span className="text-sm text-gray-500">{item.label}</span>
              </motion.div>
            ))}
          </div>
        )}
      </Section>
      
      {/* Story Section */}
      <Section title="Câu chuyện tình yêu" subtitle="Hành trình của chúng tôi từ khi gặp nhau đến lễ cưới">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-pastel-pink-300 to-pastel-purple-300"></div>
            
            {/* Timeline items */}
            {[
              {
                date: 'Tháng 5, 2020',
                title: 'Lần đầu gặp gỡ',
                description: 'Chúng tôi gặp nhau tại một buổi hội thảo về blockchain.'
              },
              {
                date: 'Tháng 8, 2021',
                title: 'Hẹn hò đầu tiên',
                description: 'Buổi hẹn hò đầu tiên tại một quán cà phê nhỏ ở quận 1.'
              },
              {
                date: 'Tháng 12, 2023',
                title: 'Cầu hôn',
                description: 'Màn cầu hôn lãng mạn tại bãi biển Vũng Tàu.'
              },
              {
                date: 'Tháng 6, 2025',
                title: 'Ngày cưới',
                description: 'Chúng tôi sẽ chính thức trở thành vợ chồng.'
              }
            ].map((item, index) => (
              <motion.div 
                key={item.title}
                className={`relative mt-10 mb-10 ${index % 2 === 0 ? 'md:ml-auto md:mr-[50%] md:pl-16 md:pr-0' : 'md:mr-auto md:ml-[50%] md:pr-16 md:pl-0'} px-6`}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 md:left-auto md:right-0 top-0 transform -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2 md:top-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-pastel-pink-500 to-pastel-purple-500 border-4 border-white shadow-lg"></div>
                
                {/* Content */}
                <div className="bg-white p-6 rounded-lg shadow-lg border border-pastel-pink-100 hover:shadow-xl transition-shadow duration-300">
                  <span className="text-sm text-pastel-pink-600 font-medium">{item.date}</span>
                  <h3 className="text-lg font-medium text-gray-900 mt-1">{item.title}</h3>
                  <p className="mt-2 text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
      
      {/* Gallery Preview */}
      <Section title="Album hình cưới" className="bg-gradient-to-br from-pastel-pink-50 to-pastel-purple-50">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="relative overflow-hidden rounded-lg border-2 border-pastel-pink-200 hover:border-pastel-purple-300 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >              <img
                src={`https://picsum.photos/300/300?random=${i + 40}`}
                alt={`Wedding preview ${i}`}
                className="w-full h-64 object-cover"
              />
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button>
            <Link to="/gallery">Xem tất cả ảnh</Link>
          </Button>
        </div>
      </Section>
      
      {/* Web3 Integration */}
      <Section title="Gửi lời chúc trên blockchain" subtitle="Gửi lời chúc của bạn đến cặp đôi thông qua công nghệ blockchain">
        <div className="max-w-lg mx-auto text-center">
          <p className="mb-6 text-gray-600">
            Làm cho lời chúc của bạn trở nên vĩnh cửu trên blockchain Polygon. Đừng lo lắng về phí gas - chúng tôi sẽ tài trợ giao dịch của bạn!
          </p>
          <Button>
            <Link to="/wishes">Gửi lời chúc ngay</Link>
          </Button>
        </div>
      </Section>
    </>
  );
};

export default HomePage;
