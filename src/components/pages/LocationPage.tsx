import React from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import Card from '../ui/Card';

const LocationPage: React.FC = () => {
  return (
    <>
      <Section title="Địa điểm" subtitle="Chi tiết về địa điểm tổ chức lễ cưới và cách đến đó">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <Card>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Trung tâm tiệc cưới XYZ</h3>
              
              {/* Map placeholder - in a real project, this would be a Google Maps embed */}
              <div className="aspect-video bg-gray-200 rounded-lg mb-6 relative overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.394629244732!2d106.70232607596275!3d10.780560089318344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4670702e31%3A0xa5777fb3a5d0d82f!2sSaigon%20Centre!5e0!3m2!1sen!2s!4v1686047301703!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Wedding Venue Map"
                ></iframe>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-primary-800 mb-2">Địa chỉ</h4>
                  <address className="not-italic text-gray-600 mb-4">
                    456 Đường DEF, Phường 5<br />
                    Quận 2, TP. Hồ Chí Minh<br />
                    Việt Nam
                  </address>
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-medium text-primary-800 mb-2">Liên hệ</h4>
                    <p className="text-gray-600">
                      Điện thoại: <a href="tel:+84123456789" className="text-primary-700 hover:text-primary-900">+84 123 456 789</a>
                    </p>
                    <p className="text-gray-600">
                      Email: <a href="mailto:wedding@example.com" className="text-primary-700 hover:text-primary-900">wedding@example.com</a>
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-primary-800 mb-2">Đỗ xe</h4>
                  <p className="text-gray-600 mb-4">
                    Có bãi đỗ xe miễn phí cho khách mời tại tầng hầm của trung tâm. Vui lòng xuất trình thiệp mời khi vào bãi.
                  </p>
                  
                  <h4 className="text-lg font-medium text-primary-800 mb-2">Giờ mở cửa</h4>
                  <p className="text-gray-600">
                    Cổng mở: 09:30 AM<br />
                    Lễ bắt đầu: 10:00 AM
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Hướng dẫn di chuyển</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-primary-800 mb-2">Bằng ô tô</h4>
                  <p className="text-gray-600">
                    Từ trung tâm thành phố, đi theo đường Nguyễn Huệ, qua cầu Thủ Thiêm và rẽ phải tại ngã tư thứ hai.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-primary-800 mb-2">Bằng taxi</h4>
                  <p className="text-gray-600">
                    Các hãng taxi Vinasun và Mai Linh đều dễ dàng tìm thấy tại các điểm đón khách chính của thành phố. Chi phí ước tính từ trung tâm khoảng 80.000 VNĐ.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-primary-800 mb-2">Từ sân bay</h4>
                  <p className="text-gray-600">
                    Từ sân bay Tân Sơn Nhất, đi theo đường cao tốc TPHCM - Long Thành - Dầu Giây và rẽ ra tại nút giao Quận 2. Thời gian di chuyển khoảng 30 phút.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </Section>
      
      <Section title="Khách sạn gần đó" className="bg-primary-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: 'Khách sạn Grand Plaza',
                address: '123 Đường ABC, Quận 2, TP.HCM',
                phone: '+84 123 456 789',
                description: 'Cách địa điểm tổ chức 500m, đi bộ khoảng 7 phút.',
                website: 'www.grandplaza.example.com'
              },
              {
                name: 'Eden Hotel',
                address: '456 Đường XYZ, Quận 2, TP.HCM',
                phone: '+84 123 456 790',
                description: 'Cách địa điểm tổ chức 1km, di chuyển bằng taxi khoảng 5 phút.',
                website: 'www.edenhotel.example.com'
              }
            ].map((hotel, index) => (
              <motion.div
                key={hotel.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card>
                  <h4 className="text-lg font-medium text-primary-800 mb-2">{hotel.name}</h4>
                  <address className="not-italic text-gray-600 mb-2">
                    {hotel.address}
                  </address>
                  <p className="text-gray-600 mb-2">
                    {hotel.description}
                  </p>
                  <div className="flex flex-wrap items-center mt-3">
                    <a 
                      href={`tel:${hotel.phone}`}
                      className="flex items-center text-primary-700 hover:text-primary-900 mr-4"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {hotel.phone}
                    </a>
                    <a 
                      href={`https://${hotel.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-primary-700 hover:text-primary-900"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Trang web
                    </a>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
};

export default LocationPage;
