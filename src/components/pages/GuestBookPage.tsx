import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';

interface GuestBookEntry {
  id: number;
  name: string;
  relationship: string;
  message: string;
  date: Date;
}

const GuestBookPage: React.FC = () => {
  // Mock data for guestbook entries (in a real app, this would come from a database)
  const [entries, setEntries] = useState<GuestBookEntry[]>([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      relationship: 'Bạn của chú rể',
      message: 'Chúc mừng hai bạn! Hạnh phúc bên nhau trọn đời nhé!',
      date: new Date('2025-06-06T10:00:00'),
    },
    {
      id: 2,
      name: 'Trần Thị B',
      relationship: 'Chị họ cô dâu',
      message: 'Chúc hai em trăm năm hạnh phúc, sớm có tin vui nhé!',
      date: new Date('2025-06-06T10:15:00'),
    },
  ]);
  
  // Form states
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [message, setMessage] = useState('');
  const [formErrors, setFormErrors] = useState({
    name: '',
    message: '',
  });
  
  // Ref for form section to scroll to
  const formRef = useRef<HTMLDivElement>(null);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    let valid = true;
    const errors = {
      name: '',
      message: '',
    };
    
    if (!name.trim()) {
      errors.name = 'Vui lòng nhập tên của bạn';
      valid = false;
    }
    
    if (!message.trim()) {
      errors.message = 'Vui lòng nhập lời nhắn';
      valid = false;
    }
    
    setFormErrors(errors);
    
    if (!valid) return;
    
    // Add new entry
    const newEntry: GuestBookEntry = {
      id: Date.now(),
      name,
      relationship,
      message,
      date: new Date(),
    };
    
    setEntries([newEntry, ...entries]);
    
    // Reset form
    setName('');
    setRelationship('');
    setMessage('');
  };
  
  // Scroll to form
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Section title="Sổ vàng" subtitle="Ký tên và để lại lời nhắn cho cặp đôi">
        <div className="max-w-4xl mx-auto">
          {/* Entry counts and sign button */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <span className="text-4xl font-bold text-pastel-purple-800">{entries.length}</span>
              <p className="text-gray-600">Khách mời đã ký tên</p>
            </div>
            
            <Button onClick={scrollToForm}>
              Ký tên ngay
            </Button>
          </motion.div>
          
          {/* Guest book entries */}
          <div className="mb-16">
            <h3 className="text-xl font-medium text-gray-900 mb-6">Lời nhắn từ khách mời</h3>
            
            <div className="space-y-4">
              {entries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card>
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pastel-purple-400 to-pastel-pink-400 flex-shrink-0 flex items-center justify-center text-white font-medium text-xl mr-4">
                        {entry.name.charAt(0)}
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-wrap justify-between items-center mb-2">
                          <h4 className="font-medium text-gray-900 mr-2">{entry.name}</h4>
                          {entry.relationship && (
                            <span className="text-xs bg-pastel-purple-100 text-pastel-purple-800 px-2 py-1 rounded-full">
                              {entry.relationship}
                            </span>
                          )}
                          <span className="text-xs text-gray-500 w-full md:w-auto mt-1 md:mt-0">
                            {entry.date.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-gray-700">{entry.message}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Sign form */}
          <div ref={formRef}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <h3 className="text-xl font-medium text-gray-900 mb-6">Ký tên</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Tên của bạn"
                    placeholder="Nhập tên của bạn"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={formErrors.name}
                    required
                  />
                  
                  <Input
                    label="Mối quan hệ với cô dâu/chú rể (không bắt buộc)"
                    placeholder="Ví dụ: Bạn cấp 3, Đồng nghiệp, Họ hàng..."
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                  />
                  
                  <TextArea
                    label="Lời nhắn"
                    placeholder="Viết lời nhắn của bạn tại đây..."
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    error={formErrors.message}
                    required
                  />
                  
                  <Button type="submit" fullWidth>
                    Gửi lời nhắn
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </Section>
      
      <Section title="Cảm ơn" className="bg-pastel-purple-50 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xl text-gray-700 mb-8">
              Chúng tôi vô cùng biết ơn sự hiện diện của bạn trong ngày trọng đại của chúng tôi.
              Tình cảm và lời chúc của bạn là món quà vô giá đối với chúng tôi.
            </p>
              <div className="text-4xl font-script text-pastel-purple-800 mb-6">
              Tuyến & Minh
            </div>
            
            <p className="text-lg text-gray-600">
              6 Tháng 6, 2025
            </p>
          </motion.div>
        </div>
      </Section>
    </>
  );
};

export default GuestBookPage;
