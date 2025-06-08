import { useState, useEffect, useMemo } from 'react';

interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

/**
 * Hook để tính toán thời gian đếm ngược đến một ngày cụ thể
 */
export const useCountdown = (targetDate: Date): CountdownValue => {
  // Memoize target timestamp để tránh tạo lại useEffect
  const targetTimestamp = useMemo(() => targetDate.getTime(), [targetDate.getTime()]);
  
  const [countdown, setCountdown] = useState<CountdownValue>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetTimestamp - now;

      if (difference <= 0) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({
        days,
        hours,
        minutes,
        seconds,
        isExpired: false,
      });
    };

    // Cập nhật ngay lập tức
    updateCountdown();

    // Cập nhật mỗi giây
    const intervalId = setInterval(updateCountdown, 1000);

    // Cleanup interval khi component unmount
    return () => clearInterval(intervalId);
  }, [targetTimestamp]); // Chỉ phụ thuộc vào targetTimestamp

  return countdown;
};
