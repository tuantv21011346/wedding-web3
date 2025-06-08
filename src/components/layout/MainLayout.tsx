import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion, AnimatePresence } from 'framer-motion';
import { Disclosure, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Trang chủ', href: '/' },
  { name: 'Cô dâu & Chú rể', href: '/couple' },
  { name: 'Ảnh cưới', href: '/gallery' },
  { name: 'Lịch trình', href: '/schedule' },
  { name: 'Địa điểm', href: '/location' },
  { name: 'Lời chúc', href: '/wishes' },
  { name: 'Sổ vàng', href: '/guestbook' },
];

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pastel-purple-50 via-white to-pastel-pink-50">
      <Disclosure as="nav" className="bg-white/95 backdrop-blur-md shadow-lg border-b border-primary-100 sticky top-0 z-50">
        {({ open }) => (
          <>
            <div className="container-wedding py-2">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <div className="flex-shrink-0">
                  <Link to="/" className="flex items-center group">
                    <div className="relative">                      <span className="font-script text-3xl bg-gradient-to-r from-pastel-pink-500 via-pastel-purple-400 to-pastel-pink-600 bg-clip-text text-transparent font-bold tracking-wide">
                        MITU
                      </span>
                      <div className="absolute -inset-1 bg-gradient-to-r from-pastel-pink-300 to-pastel-purple-300 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                    </div>
                  </Link>
                </div>
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center">
                  <div className="flex space-x-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}                        className={`relative px-4 py-2.5 text-sm font-medium rounded-full transition-all duration-300 group ${
                          pathname === item.href
                            ? 'text-white bg-gradient-to-r from-pastel-pink-400 to-pastel-purple-400 shadow-lg shadow-pastel-pink-200'
                            : 'text-gray-700 hover:text-pastel-pink-600 hover:bg-pastel-pink-50'
                        }`}
                      >
                        <span className="relative z-10">{item.name}</span>
                        {pathname !== item.href && (
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pastel-pink-400 to-pastel-purple-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Connect Wallet Button */}
                <div className="hidden md:flex items-center">
                  <div className="relative">
                    <ConnectButton showBalance={false} chainStatus="icon" />
                  </div>
                </div>
                
                {/* Mobile menu button */}
                <div className="flex md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-3 rounded-full text-gray-700 hover:text-pastel-pink-600 hover:bg-pastel-pink-50 focus:outline-none transition-colors duration-200">
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            {/* Mobile Navigation Panel */}
            <Transition
              enter="transition duration-200 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-150 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="md:hidden bg-white/95 backdrop-blur-md border-t border-pastel-pink-100">
                <div className="px-4 pt-4 pb-6 space-y-2">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as={Link}
                      to={item.href}                      className={`block px-4 py-3 text-base font-medium rounded-xl w-full text-left transition-all duration-200 ${
                        pathname === item.href
                          ? 'text-white bg-gradient-to-r from-pastel-pink-400 to-pastel-purple-400 shadow-lg'
                          : 'text-gray-700 hover:text-pastel-pink-600 hover:bg-pastel-pink-50'
                      }`}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                  <div className="pt-4 pb-2 flex justify-center">
                    <ConnectButton showBalance={false} chainStatus="icon" />
                  </div>
                </div>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container-wedding py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={pageTransition.initial}
              animate={pageTransition.animate}
              exit={pageTransition.exit}
              transition={pageTransition.transition}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>      {/* Footer */}
      <footer className="relative overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-primary-900 to-accent-900">
          <div className="absolute inset-0 opacity-30 bg-gradient-to-r from-primary-500/20 to-accent-500/20"></div>
          {/* Decorative elements */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 py-16">
          <div className="container-wedding">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
              {/* Logo và thông tin chính */}
              <div className="space-y-6">
                <div className="flex justify-center md:justify-start">
                  <div className="relative group">
                    <h3 className="font-script text-5xl bg-gradient-to-r from-primary-300 via-accent-300 to-wedding-300 bg-clip-text text-transparent font-bold">
                      MITU
                    </h3>
                    <div className="absolute -inset-3 bg-gradient-to-r from-primary-600 to-accent-600 rounded-lg blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
                  Một trang web cưới hiện đại với công nghệ Web3, 
                  lưu trữ lời chúc vĩnh viễn trên blockchain. 
                  Tình yêu bất tử, kỷ niệm vĩnh cửu.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-primary-900/60 text-primary-200 border border-primary-700/50 backdrop-blur-sm hover:bg-primary-800/60 transition-colors">
                    ⚛️ React
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-accent-900/60 text-accent-200 border border-accent-700/50 backdrop-blur-sm hover:bg-accent-800/60 transition-colors">
                    🔗 Polygon
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-wedding-900/60 text-wedding-200 border border-wedding-700/50 backdrop-blur-sm hover:bg-wedding-800/60 transition-colors">
                    🌐 Web3
                  </span>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-white font-serif">Khám phá</h4>
                <div className="grid grid-cols-2 gap-3">
                  {navigation.slice(0, 6).map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-gray-300 hover:text-primary-300 transition-all duration-200 text-sm hover:underline underline-offset-4 decoration-primary-400 decoration-2 hover:translate-x-1 transform"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="pt-4">
                  <p className="text-xs text-gray-400 mb-3">Kết nối ví để tham gia:</p>
                  <div className="flex justify-center md:justify-start">
                    <ConnectButton showBalance={false} chainStatus="icon" />
                  </div>
                </div>
              </div>

              {/* Wedding Info */}
              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-white font-serif">Thông tin đám cưới</h4>
                <div className="space-y-4 text-sm text-gray-300">
                  <div className="flex items-center justify-center md:justify-start group">
                    <span className="mr-3 text-lg group-hover:scale-110 transition-transform">📅</span>
                    <div>
                      <p className="font-medium text-white">15 tháng 8, 2025</p>
                      <p className="text-xs text-gray-400">Ngày trọng đại</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center md:justify-start group">
                    <span className="mr-3 text-lg group-hover:scale-110 transition-transform">📍</span>
                    <div>
                      <p className="font-medium text-white">Hà Nội, Việt Nam</p>
                      <p className="text-xs text-gray-400">Nơi gắn kết tình yêu</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center md:justify-start group">
                    <span className="mr-3 text-lg group-hover:scale-110 transition-transform">💜</span>
                    <div>
                      <p className="font-medium text-white">Lời chúc Blockchain</p>
                      <p className="text-xs text-gray-400">Vĩnh cửu trên Web3</p>
                    </div>
                  </div>
                </div>
                
                {/* Social Links */}
                <div className="pt-4">
                  <p className="text-sm font-medium text-white mb-3">Theo dõi chúng tôi</p>
                  <div className="flex justify-center md:justify-start space-x-4">
                    <button className="w-10 h-10 rounded-full bg-primary-800/50 hover:bg-primary-700/60 border border-primary-600/50 flex items-center justify-center transition-all duration-200 hover:scale-110">
                      <span className="text-sm">📱</span>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-accent-800/50 hover:bg-accent-700/60 border border-accent-600/50 flex items-center justify-center transition-all duration-200 hover:scale-110">
                      <span className="text-sm">💌</span>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-wedding-800/50 hover:bg-wedding-700/60 border border-wedding-600/50 flex items-center justify-center transition-all duration-200 hover:scale-110">
                      <span className="text-sm">📸</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Divider */}
            <div className="my-12">
              <div className="relative h-px">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-400/30 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-400/30 to-transparent blur-sm"></div>
              </div>
            </div>

            {/* Bottom section */}
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              <div className="text-sm text-gray-400 text-center md:text-left">
                <p className="mb-1">© {new Date().getFullYear()} MITU Wedding. Được phát triển với 💜 bằng React & Web3.</p>
                <p className="text-xs text-gray-500">Powered by Polygon Network • Gasless transactions via Biconomy</p>
              </div>
              <div className="flex items-center space-x-8 text-sm text-gray-400">
                <button className="hover:text-primary-300 transition-colors cursor-pointer hover:underline underline-offset-4">
                  Chính sách bảo mật
                </button>
                <button className="hover:text-primary-300 transition-colors cursor-pointer hover:underline underline-offset-4">
                  Điều khoản sử dụng
                </button>
                <button className="hover:text-primary-300 transition-colors cursor-pointer hover:underline underline-offset-4">
                  Liên hệ hỗ trợ
                </button>
              </div>
            </div>
            
            {/* Heart decoration */}
            <div className="flex justify-center mt-8">
              <div className="text-2xl animate-pulse">💜</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
