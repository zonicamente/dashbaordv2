import React, { useState, useEffect } from 'react';
import './Reloj.css';
import Logo from '../../assets/images/logo.png';

const Reloj: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  return (
    <div className="clock">
      <img src={Logo} alt='Dashboard SAPP' className='img-fluid' style={{ width: '50px', height: '50px' }} />
      <div className="time-info">
        <h2>
          {formatTime(currentTime)} 
        </h2>
        <h4>
          {formatDate(currentTime)}
        </h4>
        
      </div>
    </div>
  );
};

export default Reloj;
