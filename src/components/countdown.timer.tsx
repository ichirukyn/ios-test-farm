import { FC, useEffect, useState } from "react";

interface CountdownTimerProps {
    remainingTime: number;
}

const CountdownTimer:FC<CountdownTimerProps> = (props) => {
    const { remainingTime } = props
    
    const [timeLeft, setTimeLeft] = useState(Math.floor(remainingTime / 1000)); // Переводим миллисекунды в секунды
  
    useEffect(() => {
      // Если время вышло, ничего не делаем
      if (timeLeft <= 0) return;
  
      // Устанавливаем таймер, который уменьшает количество секунд каждую секунду
      const interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
  
      // Очищаем интервал при размонтировании компонента или когда отсчет завершается
      return () => clearInterval(interval);
    }, [timeLeft]);
  
    // Форматируем время для отображения в виде MM:SS
    const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };
  
    return (
      <div className='flex flex-row items-center justify-center w-screen mt-4'>
        <p className='minigame-timer'>{formatTime(timeLeft)}</p>
      </div>
    );
  };
  
  export default CountdownTimer;