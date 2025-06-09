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
          >
            <Card className="text-center h-full">
              <div className="mx-auto w-48 h-48 mb-6 rounded-full overflow-hidden border-4 border-pastel-pink-200 shadow-lg">
                <img
                  src="https://picsum.photos/400/500?random=2"
                  alt="Bride"
                  className="w-full h-full object-cover"
                />
              </div>
                <h3 className="text-2xl font-heading text-pastel-pink-900 mb-2">Trần Thị Tuyến</h3>
              <p className="font-script text-xl text-pastel-pink-700 mb-4">Cô dâu</p>
              <p className="text-gray-600 mb-4">
                Tuyến là một chuyên gia trang điểm. Cô ấy yêu thích làm đẹp, thời trang và du lịch.
              </p>
              
              <div className="flex justify-center space-x-4">
                {/* Social media icons */}
                <a href="#" className="text-pastel-pink-600 hover:text-pastel-pink-800">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-pastel-pink-600 hover:text-pastel-pink-800">
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
          >
            <Card className="text-center h-full">
              <div className="mx-auto w-48 h-48 mb-6 rounded-full overflow-hidden border-4 border-pastel-purple-200 shadow-lg">
                <img
                  src="https://picsum.photos/400/500?random=3"
                  alt="Groom"
                  className="w-full h-full object-cover"
                />
              </div>
                <h3 className="text-2xl font-heading text-pastel-purple-900 mb-2">Trần Văn Minh</h3>
              <p className="font-script text-xl text-pastel-purple-700 mb-4">Chú rể</p>
              <p className="text-gray-600 mb-4">
                Minh là một kỹ sư phần mềm. Anh ấy đam mê về công nghệ, lập trình và khởi nghiệp.
              </p>
              
              <div className="flex justify-center space-x-4">
                {/* Social media icons */}
                <a href="#" className="text-pastel-purple-600 hover:text-pastel-purple-800">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-pastel-purple-600 hover:text-pastel-purple-800">
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
      <Section title="Câu chuyện của chúng tôi" className="bg-pastel-purple-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <div className="prose prose-lg max-w-none">                <h3 className="text-2xl font-heading text-gray-900 mb-4">Khởi đầu</h3>
                <p className="text-gray-600 leading-relaxed mb-6 font-body">
                  Chúng tôi gặp nhau lần đầu vào một buổi chiều mùa thu năm 2020 tại một quán cà phê nhỏ 
                  ở trung tâm thành phố. Đó là một cuộc gặp gỡ tình cờ nhưng đã thay đổi cuộc đời cả hai. 
                  Minh đã bị cuốn hút bởi nụ cười rạng rỡ của Tuyến, còn Tuyến thì ấn tượng với sự hài hước 
                  và chân thành của Minh.
                </p>
                  <h3 className="text-2xl font-heading text-gray-900 mb-4">Phát triển</h3>
                <p className="text-gray-600 leading-relaxed mb-6 font-body">
                  Những tháng đầu, chúng tôi dành thời gian để hiểu nhau hơn. Từ những buổi đi bộ dài 
                  trong công viên đến những đêm trò chuyện đến tận khuya. Chúng tôi chia sẻ với nhau 
                  những ước mơ, kế hoạch và cả những nỗi sợ hãi. Dần dần, chúng tôi nhận ra rằng mình 
                  đã tìm thấy được một nửa hoàn hảo của cuộc đời.
                </p>
                  <h3 className="text-2xl font-heading text-gray-900 mb-4">Lời cầu hôn</h3>
                <p className="text-gray-600 leading-relaxed mb-6 font-body">
                  Vào một buổi hoàng hôn đẹp nhất của mùa xuân năm 2024, Minh đã quỳ gối cầu hôn Tuyến 
                  tại chính nơi họ gặp nhau lần đầu. Với một chiếc nhẫn kim cương lấp lánh và trái tim 
                  đầy yêu thương, anh đã hỏi: "Em có muốn cùng anh viết nên câu chuyện tình yêu vĩnh cửu không?" 
                  Và Tuyến đã gật đầu với đôi mắt đầy nước mắt hạnh phúc.
                </p>
                  <h3 className="text-2xl font-heading text-gray-900 mb-4">Tương lai</h3>
                <p className="text-gray-600 leading-relaxed font-body">
                  Ngày hôm nay, chúng tôi không chỉ kết hôn với nhau mà còn hứa hẹn sẽ cùng nhau xây dựng 
                  một tương lai tươi sáng. Chúng tôi mơ ước về một ngôi nhà ấm áp, những chuyến du lịch 
                  khắp thế giới và đặc biệt là một gia đình nhỏ với tiếng cười trẻ thơ. Hành trình tình yêu 
                  của chúng tôi chỉ mới bắt đầu, và chúng tôi không thể đợi để viết tiếp những trang tiếp theo.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Family */}
      <Section title="Gia đình chúng tôi">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bride's Family */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >              <Card>
                <h3 className="text-xl font-heading text-pastel-pink-900 mb-4">Gia đình cô dâu</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-pastel-pink-200 flex-shrink-0 mr-4"></div>
                    <div>
                      <h4 className="font-medium text-gray-900">Ông Trần Văn A</h4>
                      <p className="text-sm text-gray-600">Cha của cô dâu</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-pastel-pink-200 flex-shrink-0 mr-4"></div>
                    <div>
                      <h4 className="font-medium text-gray-900">Bà Nguyễn Thị B</h4>
                      <p className="text-sm text-gray-600">Mẹ của cô dâu</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-pastel-pink-200 flex-shrink-0 mr-4"></div>
                    <div>
                      <h4 className="font-medium text-gray-900">Trần Văn C</h4>
                      <p className="text-sm text-gray-600">Anh trai cô dâu</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Groom's Family */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >              <Card>
                <h3 className="text-xl font-heading text-pastel-purple-900 mb-4">Gia đình chú rể</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-pastel-purple-200 flex-shrink-0 mr-4"></div>
                    <div>
                      <h4 className="font-medium text-gray-900">Ông Trần Văn D</h4>
                      <p className="text-sm text-gray-600">Cha của chú rể</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-pastel-purple-200 flex-shrink-0 mr-4"></div>
                    <div>
                      <h4 className="font-medium text-gray-900">Bà Lê Thị E</h4>
                      <p className="text-sm text-gray-600">Mẹ của chú rể</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-pastel-purple-200 flex-shrink-0 mr-4"></div>
                    <div>
                      <h4 className="font-medium text-gray-900">Trần Thị F</h4>
                      <p className="text-sm text-gray-600">Em gái chú rể</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default CouplePage;
