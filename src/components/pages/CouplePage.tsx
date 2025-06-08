import React from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import Card from '../ui/Card';

const CouplePage: React.FC = () => {
  return (
    <>
      <Section title="Cô dâu & Chú rể" subtitle="Chân dung của chúng tôi">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >            <Card className="text-center h-full">
              <div className="mx-auto w-48 h-48 mb-6 rounded-full overflow-hidden border-4 border-primary-200 shadow-lg">
                <img
                  src="https://picsum.photos/400/500?random=2"
                  alt="Bride"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h3 className="text-2xl font-serif text-primary-900 mb-2">Trần Thị Tuyến</h3>
              <p className="font-script text-xl text-primary-700 mb-4">Cô dâu</p>
              <p className="text-gray-600 mb-4">
                Tuyến là một chuyên gia trang điểm. Cô ấy yêu thích làm đẹp, thời trang và du lịch.
              </p>
              
              <div className="flex justify-center space-x-4">
                {/* Social media icons */}
                <a href="#" className="text-primary-600 hover:text-primary-800">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-primary-600 hover:text-primary-800">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
                  </svg>
                </a>
              </div>
            </Card>
          </motion.div>
          
          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >            <Card className="text-center h-full">
              <div className="mx-auto w-48 h-48 mb-6 rounded-full overflow-hidden border-4 border-primary-200 shadow-lg">
                <img
                  src="https://picsum.photos/400/500?random=3"
                  alt="Groom"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h3 className="text-2xl font-serif text-primary-900 mb-2">Trần Văn Minh</h3>
              <p className="font-script text-xl text-primary-700 mb-4">Chú rể</p>
              <p className="text-gray-600 mb-4">
                Minh là một chuyên gia công nghệ thông tin. Anh ấy đam mê công nghệ,
                thể thao và chơi guitar trong thời gian rảnh rỗi.
              </p>
              
              <div className="flex justify-center space-x-4">
                {/* Social media icons */}
                <a href="#" className="text-primary-600 hover:text-primary-800">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-primary-600 hover:text-primary-800">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
              </div>
            </Card>
          </motion.div>
        </div>
      </Section>
      
      {/* Our Story */}
      <Section title="Câu chuyện của chúng tôi" className="bg-primary-50">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="prose prose-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p>
              Chúng tôi gặp nhau trong một buổi hội thảo về blockchain vào tháng 5 năm 2020. 
              Tuyến đang thuyết trình về phân tích dữ liệu trong không gian crypto và Minh là 
              một trong những người tham gia đặt câu hỏi.
            </p>
            <p>
              Sau buổi hội thảo, chúng tôi tiếp tục cuộc trò chuyện về công nghệ, blockchain 
              và tương lai của tiền điện tử. Từ những cuộc trò chuyện đó, chúng tôi nhận ra 
              rằng mình có nhiều điểm chung và quyết định gặp lại nhau.
            </p>
            <p>
              Hơn một năm sau đó, chúng tôi có buổi hẹn hò đầu tiên tại một quán cà phê nhỏ 
              ở quận 1, TP.HCM. Kể từ đó, tình yêu của chúng tôi ngày càng lớn mạnh.
            </p>
            <p>
              Vào tháng 12 năm 2023, trong chuyến du lịch đến Vũng Tàu, Minh đã bất ngờ quỳ 
              xuống và cầu hôn Tuyến khi hoàng hôn buông xuống bãi biển. Và tất nhiên, cô ấy 
              đã nói "Đồng ý!".
            </p>
            <p>
              Giờ đây chúng tôi đang hào hứng chuẩn bị cho ngày trọng đại và mong muốn được 
              chia sẻ niềm hạnh phúc này với bạn bè và gia đình.
            </p>
          </motion.div>
          
          {/* Photos */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <motion.div 
                key={i}
                className="overflow-hidden rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >                <img 
                  src={`https://picsum.photos/600/400?random=${i + 10}`}
                  alt={`Couple photo ${i}`}
                  className="w-full h-64 object-cover transform transition-transform duration-500 hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
      
      {/* Family */}
      <Section title="Gia đình" subtitle="Người thân yêu của chúng tôi">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Bride's Family */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <h3 className="text-xl font-serif text-primary-900 mb-4">Gia đình cô dâu</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary-200 flex-shrink-0 mr-4"></div>
                  <div>
                    <p className="font-medium">Nguyễn Văn A</p>
                    <p className="text-sm text-gray-600">Bố cô dâu</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary-200 flex-shrink-0 mr-4"></div>
                  <div>
                    <p className="font-medium">Phạm Thị B</p>
                    <p className="text-sm text-gray-600">Mẹ cô dâu</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary-200 flex-shrink-0 mr-4"></div>
                  <div>
                    <p className="font-medium">Nguyễn Thị C</p>
                    <p className="text-sm text-gray-600">Chị gái cô dâu</p>
                  </div>
                </li>
              </ul>
            </Card>
          </motion.div>
          
          {/* Groom's Family */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card>
              <h3 className="text-xl font-serif text-primary-900 mb-4">Gia đình chú rể</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary-200 flex-shrink-0 mr-4"></div>
                  <div>
                    <p className="font-medium">Trần Văn X</p>
                    <p className="text-sm text-gray-600">Bố chú rể</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary-200 flex-shrink-0 mr-4"></div>
                  <div>
                    <p className="font-medium">Lê Thị Y</p>
                    <p className="text-sm text-gray-600">Mẹ chú rể</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary-200 flex-shrink-0 mr-4"></div>
                  <div>
                    <p className="font-medium">Trần Văn Z</p>
                    <p className="text-sm text-gray-600">Em trai chú rể</p>
                  </div>
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </Section>
    </>
  );
};

export default CouplePage;
