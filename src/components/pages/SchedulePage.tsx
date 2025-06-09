import React from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import Card from '../ui/Card';

const SchedulePage: React.FC = () => {
  // Danh sách các sự kiện trong lễ cưới
  const events = [
    {
      id: 1,
      time: '08:00 - 09:00',
      title: 'Lễ đón dâu',
      location: 'Nhà cô dâu, 123 Đường ABC, Quận 1, TP.HCM',
      description: 'Theo phong tục truyền thống, chú rể và gia đình sẽ đến nhà cô dâu để đón dâu.',
      icon: '🏠'
    },
    {
      id: 2,
      time: '10:00 - 11:30',
      title: 'Lễ thành hôn',
      location: 'Trung tâm tiệc cưới XYZ, 456 Đường DEF, Quận 2, TP.HCM',
      description: 'Buổi lễ chính thức diễn ra với sự chứng kiến của gia đình và bạn bè thân thiết.',
      icon: '💍'
    },
    {
      id: 3,
      time: '11:30 - 14:00',
      title: 'Tiệc trưa',
      location: 'Trung tâm tiệc cưới XYZ, 456 Đường DEF, Quận 2, TP.HCM',
      description: 'Tiệc mừng với các món ăn thơm ngon, âm nhạc sôi động và nhiều tiết mục văn nghệ đặc sắc.',
      icon: '🍽️'
    },
    {
      id: 4,
      time: '18:00 - 21:00',
      title: 'Tiệc tối',
      location: 'Trung tâm tiệc cưới XYZ, 456 Đường DEF, Quận 2, TP.HCM',
      description: 'Tiệc buổi tối với nhiều hoạt động giao lưu, trò chơi và âm nhạc.',
      icon: '🎉'
    }
  ];

  return (
    <>
      <Section title="Lịch trình" subtitle="Các sự kiện trong ngày trọng đại">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline center line */}
            <div className="absolute left-0 md:left-1/2 top-0 h-full w-1 bg-pastel-purple-300 transform md:translate-x-0 translate-x-4"></div>
            
            {/* Timeline events */}
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                className={`mb-12 flex ${
                  index % 2 === 0
                    ? 'md:flex-row flex-row-reverse'
                    : 'md:flex-row-reverse flex-row-reverse'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 translate-x-0">
                  <div className="w-8 h-8 rounded-full bg-pastel-purple-500 border-4 border-white text-center leading-7">
                    {event.icon}
                  </div>
                </div>
                
                {/* Content container */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 pl-12' : 'md:pl-12 pl-12'}`}>
                  <Card>
                    <span className="inline-block px-3 py-1 rounded-full bg-pastel-purple-200 text-pastel-purple-800 text-sm font-medium mb-3">
                      {event.time}
                    </span>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-3">{event.description}</p>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-pastel-purple-700 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <address className="not-italic text-sm text-gray-600">
                        {event.location}
                      </address>
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
      
      <Section title="Dresscode" className="bg-pastel-purple-50">
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Khách mời nam</h3>
                <p className="text-gray-600">
                  Suit, áo sơ mi, hoặc áo veston. Màu sắc trang nhã như xanh navy, xám, đen hoặc be.
                </p>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Khách mời nữ</h3>
                <p className="text-gray-600">
                  Đầm, váy hoặc áo dài. Màu sắc tươi sáng như pastel, hoa nhẹ nhàng. Xin tránh màu trắng.
                </p>
              </Card>
            </motion.div>
          </div>
          
          <div className="text-center mt-8 text-gray-600">
            <p>
              Cảm ơn bạn đã tuân thủ dresscode để tạo nên một không gian hài hòa và đẹp mắt trong ngày đặc biệt của chúng tôi.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
};

export default SchedulePage;
