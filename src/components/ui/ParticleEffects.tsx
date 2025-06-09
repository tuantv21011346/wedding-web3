import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  delay: number;
  duration: number;
  size: number;
  drift: number;
}

interface MouseTrail {
  id: number;
  x: number;
  y: number;
}

const ParticleEffects: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mouseTrails, setMouseTrails] = useState<MouseTrail[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    // Sử dụng useRef để tránh dependency loop
  const particleCounterRef = useRef(0);
  const trailCounterRef = useRef(0);
  const fallingEmojis = ['💖', '🌸', '💕', '🌸']; // Chỉ trái tim và hoa đào
  const createParticle = useCallback((): Particle => {
    particleCounterRef.current += 1;
    const newId = `particle_${Date.now()}_${particleCounterRef.current}_${Math.floor(Math.random() * 10000)}`;
    return {
      id: Number(newId.replace(/\D/g, '').slice(-10)), // Chuyển thành số từ 10 ký tự cuối
      x: Math.random() * (window.innerWidth + 200) - 100, // Mở rộng vùng spawn để hỗ trợ rơi chéo
      y: -80,      emoji: fallingEmojis[Math.floor(Math.random() * fallingEmojis.length)],
      delay: Math.random() * 0.5, // Giảm delay từ 1 xuống 0.5 để tăng mật độ
      duration: 5 + Math.random() * 2, // Giảm thời gian rơi từ 6-9 xuống 5-7
      size: 16 + Math.random() * 8,
      drift: 150 + Math.random() * 100, // Tăng drift để rơi chéo từ phải qua trái
    };  }, []); // Loại bỏ fallingEmojis khỏi dependency

  useEffect(() => {
    const initialParticles = Array.from({ length: 50 }, createParticle); // Tăng từ 25 lên 50
    setParticles(initialParticles);
  }, []); // Chỉ chạy một lần khi mount

  useEffect(() => {    const interval = setInterval(() => {
      setParticles(prev => {
        const activeParticles = prev.filter(p => p.y < window.innerHeight + 100);
        if (activeParticles.length < 80) { // Tăng từ 40 lên 80 để duy trì mật độ cao hơn
          return [...activeParticles, createParticle()];
        }
        return activeParticles;
      });
    }, 400); // Giảm từ 800ms xuống 400ms để spawn nhanh hơn

    return () => clearInterval(interval);
  }, []); // Loại bỏ createParticle khỏi dependency

  useEffect(() => {
    let throttleTimer: NodeJS.Timeout | null = null;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (!throttleTimer) {
        throttleTimer = setTimeout(() => {
          trailCounterRef.current += 1;
          const newId = Date.now() * 1000 + trailCounterRef.current;
          const newTrail: MouseTrail = {
            id: newId,
            x: e.clientX,
            y: e.clientY
          };
          
          setMouseTrails(prev => [...prev.slice(-6), newTrail]);
          throttleTimer = null;
        }, 50); // Giảm từ 100ms xuống 50ms để chuột mượt hơn
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, []);

  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now();
      setParticles(prev => prev.filter(particle => 
        now - particle.id < particle.duration * 1000
      ));
      setMouseTrails(prev => prev.filter(trail => 
        now - trail.id < 1500
      ));
    }, 2000);

    return () => clearInterval(cleanup);
  }, []);

  return (
    <>      {/* Falling particles */}
      <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
        <AnimatePresence>
          {particles.map((particle) => (            <motion.div
              key={particle.id}
              initial={{ 
                x: particle.x, 
                y: -80,
                opacity: 0,
                scale: 0
              }}
              animate={{ 
                y: window.innerHeight + 80,
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
                x: particle.x - particle.drift // Đổi thành trừ để rơi từ phải sang trái
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: "linear"
              }}
              className="absolute select-none"
              style={{
                fontSize: `${particle.size}px`,
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }}
            >
              {particle.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>      {/* Mouse trail hearts */}
      <div className="fixed inset-0 pointer-events-none z-[9998]">
        <AnimatePresence>
          {mouseTrails.map((trail, index) => (
            <motion.div
              key={trail.id}
              initial={{ 
                scale: 0,
                opacity: 1,
                x: trail.x - 8,
                y: trail.y - 8
              }}
              animate={{ 
                scale: [0, 1.5, 0],
                opacity: [1, 0.7, 0],
                y: trail.y - 40
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.2,
                delay: index * 0.03,
                ease: "easeOut"
              }}
              className="absolute select-none"
              style={{
                fontSize: '14px',
                filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))'
              }}
            >
              💖
            </motion.div>
          ))}
        </AnimatePresence>
      </div>      {/* Custom cursor */}
      <div 
        className="fixed pointer-events-none z-[9998] transition-transform duration-75 ease-out"
        style={{
          left: mousePosition.x - 20,
          top: mousePosition.y - 20,
          width: 40,
          height: 40
        }}
      >
        {/* Main cursor heart */}
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 15, -15, 0]
          }}
          transition={{
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-pink-500 select-none"
          style={{ fontSize: '20px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
        >
          💖
        </motion.div>

        {/* Orbiting hearts */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
          className="relative w-full h-full"
        >
          {[0, 120, 240].map((angle, index) => (
            <motion.div
              key={angle}
              className="absolute text-pink-400 select-none"
              style={{
                fontSize: '10px',
                left: '50%',
                top: '50%',
                transform: `rotate(${angle}deg) translateY(-18px) translateX(-50%)`,
                filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))'
              }}
              animate={{
                scale: [0.5, 1, 0.5],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                delay: index * 0.3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              💕
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default ParticleEffects;